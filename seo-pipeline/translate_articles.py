# -*- coding: utf-8 -*-
"""
Translate articles to multiple languages using Anthropic Claude API.

Usage:
    python translate_articles.py --config myshop.json
    python translate_articles.py --config myshop.json --resume
    python translate_articles.py --config myshop.json --langs de,en,pl
    python translate_articles.py --config myshop.json --start P54

Config file needs: articles_dir, primary_language, languages, shop_context
Requires: ANTHROPIC_API_KEY env var or config_secrets.py
"""

import anthropic
import os
import re
import json
import time
import sys
import argparse


LANG_NAMES = {
    'cs': 'Czech', 'sk': 'Slovak', 'de': 'German', 'en': 'English',
    'pl': 'Polish', 'es': 'Spanish', 'it': 'Italian', 'nl': 'Dutch',
    'hr': 'Croatian', 'ro': 'Romanian', 'bg': 'Bulgarian', 'fr': 'French',
    'hu': 'Hungarian', 'sv': 'Swedish', 'fi': 'Finnish', 'uk': 'Ukrainian',
    'pt': 'Portuguese', 'da': 'Danish', 'el': 'Greek', 'et': 'Estonian',
    'lv': 'Latvian', 'lt': 'Lithuanian', 'sl': 'Slovenian', 'lb': 'Luxembourgish',
    'no': 'Norwegian', 'sr': 'Serbian', 'vi': 'Vietnamese',
    'ja': 'Japanese', 'ko': 'Korean', 'zh': 'Chinese', 'ar': 'Arabic',
    'tr': 'Turkish', 'ru': 'Russian', 'th': 'Thai',
}


def load_api_key():
    key = os.environ.get('ANTHROPIC_API_KEY')
    if key:
        return key
    try:
        from config_secrets import ANTHROPIC_API_KEY
        return ANTHROPIC_API_KEY
    except ImportError:
        pass
    print("ERROR: Set ANTHROPIC_API_KEY env var or create config_secrets.py")
    sys.exit(1)


def load_config(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def parse_frontmatter(content):
    """Parse YAML frontmatter from markdown."""
    if not content.startswith('---'):
        return {}, content
    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content
    fm_text = parts[1].strip()
    body = parts[2].strip()
    meta = {}
    current_key = None
    for line in fm_text.split('\n'):
        stripped = line.strip()
        if not stripped:
            continue
        kv = re.match(r'^(\w[\w_]*)\s*:\s*(.*)$', line)
        if kv and not line.startswith('  '):
            current_key = kv.group(1)
            val = kv.group(2).strip()
            if val.startswith('"') and val.endswith('"'):
                meta[current_key] = val.strip('"')
            elif val.startswith("'") and val.endswith("'"):
                meta[current_key] = val.strip("'")
            elif val.startswith('['):
                items = re.findall(r'"([^"]*)"', val)
                meta[current_key] = items if items else []
            elif val == '' or val == '[]':
                meta[current_key] = []
            else:
                meta[current_key] = val
        elif stripped.startswith('- ') and current_key:
            if current_key not in meta or not isinstance(meta.get(current_key), list):
                meta[current_key] = []
            meta[current_key].append(stripped[2:].strip().strip('"').strip("'"))
    return meta, body


# ═══════════════════════════════════════════════════════════════
# TRANSLATION
# ═══════════════════════════════════════════════════════════════

def translate_body(client, body, meta, source_lang, target_lang, context, model):
    """Translate article body to target language."""
    lang_name = LANG_NAMES.get(target_lang, target_lang)
    src_name = LANG_NAMES.get(source_lang, source_lang)
    title = meta.get('title', '')

    prompt = f"""Translate this article from {src_name} to {lang_name} for an e-shop ({context}).

RULES:
- Translate ALL text naturally into {lang_name}
- Keep ALL markdown formatting (##, ###, |table|, [links](urls), **bold**, - lists)
- Keep ALL URLs unchanged — do NOT translate URL paths
- Translate the H1 title too
- Keep brand/product names untranslated (CBD, LED, AeroPress, etc.)
- Keep scientific/Latin names as-is
- Write naturally in {lang_name}, not word-by-word
- No emoji
- Return ONLY the translated markdown (no frontmatter, no code fences)

ARTICLE: {title}

{body}"""

    resp = client.messages.create(
        model=model, max_tokens=8000,
        messages=[{"role": "user", "content": prompt}]
    )
    result = resp.content[0].text
    if result.startswith('```'):
        result = re.sub(r'^```\w*\n', '', result)
        result = re.sub(r'\n```\s*$', '', result)
    return result


def translate_meta(client, meta, target_lang, context, model):
    """Translate title and metaDescription."""
    lang_name = LANG_NAMES.get(target_lang, target_lang)
    prompt = f"""Translate to {lang_name} for e-shop ({context}).
Return JSON: {{"title": "...", "metaDescription": "..."}} (metaDescription: 150-160 chars)

Title: {meta.get('title', '')}
MetaDescription: {meta.get('metaDescription', '')}"""

    resp = client.messages.create(
        model=model, max_tokens=500,
        messages=[{"role": "user", "content": prompt}]
    )
    text = resp.content[0].text.strip()
    try:
        m = re.search(r'\{[^}]+\}', text, re.DOTALL)
        if m:
            return json.loads(m.group())
    except:
        pass
    return {'title': meta.get('title', ''), 'metaDescription': meta.get('metaDescription', '')}


# ═══════════════════════════════════════════════════════════════
# STATE
# ═══════════════════════════════════════════════════════════════

def load_state(path):
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def save_state(path, state):
    os.makedirs(os.path.dirname(path) or '.', exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(state, f, ensure_ascii=False, indent=2)


# ═══════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(description='Translate articles to multiple languages')
    parser.add_argument('--config', required=True, help='Shop config JSON')
    parser.add_argument('--resume', action='store_true', help='Skip already translated')
    parser.add_argument('--langs', help='Comma-separated target languages (default: all from config)')
    parser.add_argument('--start', help='Start from article ID')
    parser.add_argument('--model', default='claude-haiku-4-5-20251001', help='Model for translation')
    args = parser.parse_args()

    config = load_config(args.config)
    api_key = load_api_key()
    client = anthropic.Anthropic(api_key=api_key)

    articles_dir = config['articles_dir']
    primary_lang = config.get('primary_language', 'cs')
    context = config.get('shop_context', config.get('shop_name', ''))

    target_langs = args.langs.split(',') if args.langs else [
        l for l in config.get('languages', []) if l != primary_lang
    ]

    trans_dir = config.get('translations_dir', os.path.join(articles_dir, 'translations'))
    state_path = os.path.join(trans_dir, '.translate_state.json')
    state = load_state(state_path) if args.resume else {}

    files = sorted([f for f in os.listdir(articles_dir)
                    if f.endswith('.md') and not os.path.isdir(os.path.join(articles_dir, f))])

    total = len(files) * len(target_langs)
    print(f"\n{'='*60}")
    print(f"  TRANSLATE: {config.get('shop_name', 'Shop')}")
    print(f"  {len(files)} articles x {len(target_langs)} languages = {total}")
    print(f"  Model: {args.model}")
    print(f"{'='*60}")

    done = 0
    skipped = 0
    errors = 0
    started = args.start is None

    for filename in files:
        art_id = filename.split('-')[0]

        if not started:
            if art_id == args.start:
                started = True
            else:
                continue

        filepath = os.path.join(articles_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        meta, body = parse_frontmatter(content)
        if not body.strip():
            continue

        for lang in target_langs:
            key = f"{art_id}_{lang}"
            if args.resume and state.get(key) == 'done':
                skipped += 1
                continue

            print(f"  [{done+skipped+errors+1}/{total}] {art_id} -> {lang}")
            try:
                trans_body = translate_body(client, body, meta, primary_lang, lang, context, args.model)
                trans_meta = translate_meta(client, meta, lang, context, args.model)

                lang_dir = os.path.join(trans_dir, lang)
                os.makedirs(lang_dir, exist_ok=True)

                out = {
                    'title': trans_meta.get('title', meta.get('title', '')),
                    'metaDescription': trans_meta.get('metaDescription', ''),
                    'slug': meta.get('slug', ''),
                    'body': trans_body,
                    'language': lang,
                    'source_article': art_id,
                }
                with open(os.path.join(lang_dir, f"{art_id}.json"), 'w', encoding='utf-8') as f:
                    json.dump(out, f, ensure_ascii=False, indent=2)

                state[key] = 'done'
                save_state(state_path, state)
                done += 1
                time.sleep(0.2)

            except Exception as e:
                print(f"    ERROR: {e}")
                state[key] = f'error: {str(e)[:100]}'
                save_state(state_path, state)
                errors += 1
                time.sleep(2)

    print(f"\n  Result: {done} translated, {skipped} skipped, {errors} errors")


if __name__ == '__main__':
    main()
