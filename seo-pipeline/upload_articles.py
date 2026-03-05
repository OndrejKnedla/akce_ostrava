# -*- coding: utf-8 -*-
"""
Upload articles to Upgates CMS — Universal uploader.
Reads markdown articles, converts to branded HTML, uploads via Upgates REST API.

Usage:
    python upload_articles.py --config myshop.json --dry-run   # Preview HTML
    python upload_articles.py --config myshop.json             # Upload
    python upload_articles.py --config myshop.json --resume    # Continue after interruption

Config file (JSON):
{
    "shop_name": "My Shop",
    "articles_dir": "./articles",
    "translations_dir": "./articles/translations",
    "upgates_api_url": "https://shop.admin.s15.upgates.com/api/v2",
    "upgates_api_user": "12345678",
    "upgates_api_pass": "YOUR_API_KEY",
    "primary_language": "cs",
    "languages": ["cs", "sk", "de", "en"],
    "brand": {
        "color": "#2d7d32",
        "accent": "#66bb6a",
        "bg": "#f1f8e9",
        "text": "#1b5e20",
        "font": "'Segoe UI', Roboto, Arial, sans-serif"
    }
}

Requires: pip install markdown requests
Optional: config_secrets.py for API credentials override
"""

import os
import re
import json
import time
import sys
import argparse
import requests
import markdown


# ═══════════════════════════════════════════════════════════════
# FRONTMATTER PARSER
# ═══════════════════════════════════════════════════════════════

def parse_frontmatter(content):
    """Parse YAML-like frontmatter from markdown file."""
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
        if not stripped or stripped.startswith('#'):
            continue

        kv_match = re.match(r'^(\w[\w_]*)\s*:\s*(.*)$', line)
        if kv_match and not line.startswith('  ') and not line.startswith('\t'):
            current_key = kv_match.group(1)
            value = kv_match.group(2).strip()
            if value == '' or value == '[]':
                meta[current_key] = []
            elif value.startswith('[') and value.endswith(']'):
                items = re.findall(r'"([^"]*)"', value)
                if not items:
                    items = re.findall(r"'([^']*)'", value)
                if not items:
                    items = [v.strip().strip('"').strip("'")
                             for v in value[1:-1].split(',') if v.strip()]
                meta[current_key] = items
            elif value.startswith('"') and value.endswith('"'):
                meta[current_key] = value.strip('"')
            elif value.startswith("'") and value.endswith("'"):
                meta[current_key] = value.strip("'")
            else:
                meta[current_key] = value
        elif stripped.startswith('- ') and current_key:
            val = stripped[2:].strip().strip('"').strip("'")
            if current_key in meta and isinstance(meta[current_key], list):
                meta[current_key].append(val)

    return meta, body


# ═══════════════════════════════════════════════════════════════
# MARKDOWN → STYLED HTML
# ═══════════════════════════════════════════════════════════════

def md_to_html(md_body, brand):
    """Convert markdown body to branded HTML for Upgates CMS."""
    html = markdown.markdown(md_body, extensions=['tables', 'fenced_code'])

    color = brand.get('color', '#333')
    accent = brand.get('accent', '#666')
    bg = brand.get('bg', '#f5f5f5')
    text = brand.get('text', '#222')
    font = brand.get('font', "'Segoe UI', Arial, sans-serif")

    return f"""<div class="blog-article" style="font-family: {font}; line-height: 1.75; color: #333; max-width: 860px;">
<style>
.blog-article h2 {{
    color: {color}; border-bottom: 2px solid {accent}; padding-bottom: 8px;
    margin: 2em 0 0.8em; font-size: 1.45em;
}}
.blog-article h3 {{
    color: {text}; margin: 1.5em 0 0.5em; font-size: 1.15em;
}}
.blog-article table {{
    width: 100%; border-collapse: collapse; margin: 1.5em 0;
    font-size: 0.93em; border-radius: 8px; overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}}
.blog-article th {{
    background: {color}; color: #fff; padding: 11px 14px;
    text-align: left; font-weight: 600;
}}
.blog-article td {{
    padding: 9px 14px; border-bottom: 1px solid #e0e0e0;
}}
.blog-article tr:nth-child(even) {{ background: {bg}; }}
.blog-article blockquote {{
    border-left: 4px solid {accent}; padding: 12px 20px;
    margin: 1.5em 0; background: {bg}; border-radius: 0 8px 8px 0;
}}
.blog-article a {{
    color: {color}; text-decoration: none; border-bottom: 1px dotted {accent};
}}
.blog-article a:hover {{ color: {accent}; }}
.blog-article ul, .blog-article ol {{ margin: 0.8em 0; padding-left: 1.4em; }}
.blog-article li {{ margin-bottom: 0.4em; }}
.blog-article p {{ margin: 0.7em 0; }}
.blog-article strong {{ color: {text}; }}
</style>
{html}
</div>"""


def make_short_description(body):
    """Extract plain-text short description from first paragraph."""
    paragraphs = [p.strip() for p in body.split('\n\n')
                  if p.strip() and not p.strip().startswith('#')
                  and not p.strip().startswith('|')]
    if not paragraphs:
        return ''
    text = paragraphs[0]
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'\*([^*]+)\*', r'\1', text)
    return text[:300].strip()


# ═══════════════════════════════════════════════════════════════
# BUILD DESCRIPTIONS (multi-language)
# ═══════════════════════════════════════════════════════════════

def build_descriptions(meta, body, config, art_id):
    """Build descriptions array for Upgates API (all languages)."""
    brand = config.get('brand', {})
    descriptions = []

    # Primary language
    html = md_to_html(body, brand)
    title = meta.get('title', '')
    slug = meta.get('slug', '')
    seo_desc = meta.get('metaDescription', '')
    if isinstance(seo_desc, list):
        seo_desc = seo_desc[0] if seo_desc else ''

    descriptions.append({
        'language_id': config.get('primary_language', 'cs'),
        'active_yn': True,
        'title': title[:200],
        'short_description': make_short_description(body),
        'long_description': html,
        'seo_title': title[:70],
        'seo_description': seo_desc[:160],
        'seo_url': slug,
    })

    # Translations
    trans_dir = config.get('translations_dir', os.path.join(config['articles_dir'], 'translations'))
    for lang in config.get('languages', []):
        if lang == config.get('primary_language', 'cs'):
            continue
        trans_path = os.path.join(trans_dir, lang, f"{art_id}.json")
        if not os.path.exists(trans_path):
            continue
        with open(trans_path, 'r', encoding='utf-8') as f:
            trans = json.load(f)
        trans_html = md_to_html(trans.get('body', ''), brand)
        descriptions.append({
            'language_id': lang,
            'active_yn': True,
            'title': trans.get('title', title)[:200],
            'short_description': '',
            'long_description': trans_html,
            'seo_title': trans.get('title', title)[:70],
            'seo_description': trans.get('metaDescription', '')[:160],
            'seo_url': slug,
        })

    return descriptions


# ═══════════════════════════════════════════════════════════════
# STATE MANAGEMENT
# ═══════════════════════════════════════════════════════════════

def load_state(state_path):
    if os.path.exists(state_path):
        with open(state_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def save_state(state_path, state):
    os.makedirs(os.path.dirname(state_path) or '.', exist_ok=True)
    with open(state_path, 'w', encoding='utf-8') as f:
        json.dump(state, f, ensure_ascii=False, indent=2)


# ═══════════════════════════════════════════════════════════════
# UPLOAD
# ═══════════════════════════════════════════════════════════════

def upload(config, dry_run=False, resume=False):
    """Upload all articles to Upgates CMS."""
    articles_dir = config['articles_dir']
    api_url = config['upgates_api_url']
    api_user = config['upgates_api_user']
    api_pass = config['upgates_api_pass']

    state_path = os.path.join(articles_dir, '.upload_state.json')
    state = load_state(state_path) if resume else {}

    # Find all markdown files
    files = sorted([f for f in os.listdir(articles_dir)
                    if f.endswith('.md') and not os.path.isdir(os.path.join(articles_dir, f))])

    print(f"\n{'='*60}")
    print(f"  UPLOAD: {config['shop_name']} — {len(files)} articles")
    print(f"  Mode: {'DRY RUN' if dry_run else 'LIVE'}")
    print(f"{'='*60}")

    payloads = []
    skipped = 0

    for i, filename in enumerate(files):
        art_id = filename.split('-')[0]

        if resume and state.get(art_id) == 'uploaded':
            skipped += 1
            continue

        filepath = os.path.join(articles_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        meta, body = parse_frontmatter(content)
        if not body.strip():
            continue

        descriptions = build_descriptions(meta, body, config, art_id)
        payloads.append((art_id, {
            'active_yn': True,
            'descriptions': descriptions,
        }))
        print(f"  [{i+1}/{len(files)}] {meta.get('title','')[:55]} ({len(descriptions)} langs)")

    if skipped:
        print(f"  Skipped {skipped} already uploaded")

    if dry_run:
        # Save HTML preview
        if payloads:
            preview = os.path.join(articles_dir, '_preview.html')
            first = payloads[0][1]['descriptions'][0]
            total_langs = sum(len(p[1]['descriptions']) for p in payloads)
            with open(preview, 'w', encoding='utf-8') as f:
                f.write(f"""<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Preview - {config['shop_name']}</title>
<style>body {{ max-width: 960px; margin: 40px auto; padding: 0 20px; background: #fafafa; }}
.info {{ background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px; }}</style>
</head><body>
<div class="info"><h2>{config['shop_name']} — Upload Preview</h2>
<p>Articles: {len(payloads)} | Language versions: {total_langs}</p></div>
<h1>{first['title']}</h1>
<p><em>SEO: {first['seo_description']}</em></p><hr>
{first['long_description']}
</body></html>""")
            print(f"\n  Preview: {preview}")
            print(f"  Total: {len(payloads)} articles, {total_langs} language versions")
        return

    # Upload in batches (Upgates max 100, using 30 for safety)
    batch_size = 30
    uploaded = 0
    failed = 0

    for batch_start in range(0, len(payloads), batch_size):
        batch = payloads[batch_start:batch_start + batch_size]
        data = {'articles': [p[1] for p in batch]}

        print(f"\n  Batch {batch_start//batch_size + 1} ({len(batch)} articles)...")
        try:
            resp = requests.post(
                f"{api_url}/articles", json=data,
                auth=(api_user, api_pass),
                headers={'Content-Type': 'application/json'},
                timeout=120,
            )
            if resp.status_code == 200:
                results = resp.json().get('articles', [])
                for j, r in enumerate(results):
                    aid = batch[j][0] if j < len(batch) else '?'
                    if r.get('inserted_yn'):
                        uploaded += 1
                        state[aid] = 'uploaded'
                    else:
                        failed += 1
                        state[aid] = f"failed: {r.get('messages', [])}"
                        print(f"    WARN {aid}: {r.get('messages', [])}")
                save_state(state_path, state)
                ok = sum(1 for r in results if r.get('inserted_yn'))
                print(f"    OK: {ok}/{len(results)}")
            else:
                print(f"    ERROR {resp.status_code}: {resp.text[:300]}")
                for aid, _ in batch:
                    state[aid] = f'http_{resp.status_code}'
                    failed += 1
                save_state(state_path, state)
        except Exception as e:
            print(f"    EXCEPTION: {e}")
            for aid, _ in batch:
                state[aid] = f'error: {str(e)[:80]}'
                failed += 1
            save_state(state_path, state)

        time.sleep(2)

    print(f"\n  RESULT: {uploaded} uploaded, {failed} failed, {skipped} skipped")


def main():
    parser = argparse.ArgumentParser(description='Upload articles to Upgates CMS')
    parser.add_argument('--config', required=True, help='Path to shop config JSON')
    parser.add_argument('--dry-run', action='store_true', help='Generate HTML preview without uploading')
    parser.add_argument('--resume', action='store_true', help='Skip already uploaded articles')
    args = parser.parse_args()

    config = load_config(args.config)
    upload(config, dry_run=args.dry_run, resume=args.resume)


if __name__ == '__main__':
    main()
