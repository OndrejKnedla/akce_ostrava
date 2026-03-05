# -*- coding: utf-8 -*-
"""
SEO Article Generator — Universal Upgates CMS Pipeline
Generates, improves, and manages blog articles using Anthropic Claude API.

Usage:
    python generate_articles.py generate --config myshop.json
    python generate_articles.py generate --config myshop.json --start 5 --ids P01,P02
    python generate_articles.py status --config myshop.json

Config file (JSON):
{
    "shop_name": "My Shop",
    "shop_context": "myshop.cz — e-shop description for AI context",
    "articles_dir": "./articles",
    "primary_language": "cs",
    "generation_model": "claude-haiku-4-5-20251001",
    "articles": [
        {
            "id": "A01",
            "slug": "my-first-article",
            "title": "My First Article Title",
            "type": "guide",
            "cluster": "main",
            "silo_top": "/category-url",
            "keywords": ["keyword1", "keyword2"],
            "length": 2000,
            "categories": ["/cat1", "/cat2"]
        }
    ]
}

For VS comparison articles, set type to "vs_comparison" and add:
    "strain1": "Name A", "strain2": "Name B", "desc": "Details about both"

Requires: ANTHROPIC_API_KEY environment variable or config_secrets.py
"""

import anthropic
import os
import time
import sys
import re
import json
import argparse


def load_api_key():
    """Load Anthropic API key from env or config file."""
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


def load_config(config_path):
    """Load shop configuration from JSON."""
    with open(config_path, 'r', encoding='utf-8') as f:
        return json.load(f)


# ═══════════════════════════════════════════════════════════════
# GENERATION FUNCTIONS
# ═══════════════════════════════════════════════════════════════

def generate_vs_comparison(client, article, config):
    """Generate a product/strain VS comparison article."""
    model = config.get('generation_model', 'claude-haiku-4-5-20251001')
    lang = config.get('primary_language', 'cs')
    lang_names = {'cs': 'Czech', 'sk': 'Slovak', 'de': 'German', 'en': 'English',
                  'pl': 'Polish', 'es': 'Spanish', 'fr': 'French', 'it': 'Italian'}
    lang_name = lang_names.get(lang, 'Czech')

    prompt = f"""Write an SEO article in {lang_name} in markdown format for e-shop ({config['shop_context']}).

FORMAT: Start with YAML frontmatter (---), then markdown content.

Frontmatter:
---
title: "{article['title']}"
slug: {article['slug']}
metaDescription: "Comparison of {article.get('strain1','')} and {article.get('strain2','')} — key differences and recommendations. 150-160 chars."
keywords:
  - {article.get('strain1','')} vs {article.get('strain2','')}
  - comparison
cluster: {article.get('cluster', 'comparison')}
silo_top: {article.get('silo_top', '/')}
products: {json.dumps(article.get('categories', []))}
language: "{lang}"
date: "{time.strftime('%Y-%m-%d')}"
---

CONTENT (1200-1500 words):
1. Introduction (2-3 sentences)
2. Comparison table (key parameters side by side)
3. {article.get('strain1','')} — detailed profile
4. {article.get('strain2','')} — detailed profile
5. Which one to choose? (decision scenarios)
6. FAQ (3-4 questions)

Details: {article.get('desc', '')}
Write professionally, NO emoji."""

    resp = client.messages.create(
        model=model, max_tokens=4000,
        messages=[{"role": "user", "content": prompt}]
    )
    return resp.content[0].text


def generate_guide(client, article, config):
    """Generate a guide/informational SEO article."""
    model = config.get('generation_model', 'claude-haiku-4-5-20251001')
    lang = config.get('primary_language', 'cs')
    lang_names = {'cs': 'Czech', 'sk': 'Slovak', 'de': 'German', 'en': 'English',
                  'pl': 'Polish', 'es': 'Spanish', 'fr': 'French', 'it': 'Italian'}
    lang_name = lang_names.get(lang, 'Czech')
    kw = json.dumps(article.get('keywords', []), ensure_ascii=False)

    prompt = f"""Write an SEO article in {lang_name} in markdown format for e-shop ({config['shop_context']}).

FORMAT: Start with YAML frontmatter (---), then markdown content.

Frontmatter:
---
title: "{article['title']}"
slug: "{article['slug']}"
metaDescription: "Exactly 150-160 characters description"
keywords: {kw}
cluster: "{article.get('cluster', '')}"
silo_top: "{article.get('silo_top', '')}"
products: {json.dumps(article.get('categories', [article.get('silo_top', '')]), ensure_ascii=False)}
language: "{lang}"
date: "{time.strftime('%Y-%m-%d')}"
---

CONTENT (~{article.get('length', 2000)} words):
- Topic: {article['title']}
- Keywords: {', '.join(article.get('keywords', []))}
- E-shop context: {config['shop_context']}

STRUCTURE:
1. Introduction paragraph (what/why/for whom)
2. 3-6 main sections with ## headings
3. Practical tips (table or bullet points)
4. FAQ (3-4 questions)

Link to e-shop categories like [category name]({article.get('silo_top', '/')})
Write professionally, NO emoji.
metaDescription must be exactly 150-160 characters."""

    resp = client.messages.create(
        model=model, max_tokens=6000,
        messages=[{"role": "user", "content": prompt}]
    )
    return resp.content[0].text


def save_article(content, directory, article_id, slug):
    """Save article to markdown file."""
    if content.startswith('```'):
        content = re.sub(r'^```\w*\n', '', content)
        content = re.sub(r'\n```\s*$', '', content)

    filename = f"{article_id}-{slug}.md"
    filepath = os.path.join(directory, filename)
    os.makedirs(directory, exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  Saved: {filename} ({len(content)} chars)")
    return filepath


def get_existing(directory, prefix=''):
    """Get set of already-generated article IDs."""
    if not os.path.exists(directory):
        return set()
    return {f.split('-')[0] for f in os.listdir(directory)
            if f.endswith('.md') and (not prefix or f.startswith(prefix))}


# ═══════════════════════════════════════════════════════════════
# COMMANDS
# ═══════════════════════════════════════════════════════════════

def cmd_generate(args):
    """Generate articles from config."""
    config = load_config(args.config)
    api_key = load_api_key()
    client = anthropic.Anthropic(api_key=api_key)

    articles_dir = config.get('articles_dir', './articles')
    articles = config.get('articles', [])

    if not articles:
        print("No articles defined in config. Add 'articles' array.")
        return

    existing = get_existing(articles_dir)
    specific_ids = set(args.ids.split(',')) if args.ids else None

    print(f"\n{'='*60}")
    print(f"  {config['shop_name']} — {len(articles)} articles defined, {len(existing)} on disk")
    print(f"  Model: {config.get('generation_model', 'claude-haiku-4-5-20251001')}")
    print(f"{'='*60}")

    done = 0
    errors = 0
    started = args.start is None

    for article in articles:
        art_id = article['id']

        if not started:
            if str(art_id) == str(args.start):
                started = True
            else:
                continue

        if specific_ids and art_id not in specific_ids:
            continue

        if art_id in existing and not args.force:
            continue

        print(f"\n[{done+1}] Generating {art_id}: {article['title'][:60]}")

        try:
            if article.get('type') == 'vs_comparison':
                content = generate_vs_comparison(client, article, config)
            else:
                content = generate_guide(client, article, config)

            save_article(content, articles_dir, art_id, article['slug'])
            done += 1
            time.sleep(0.5)

        except Exception as e:
            print(f"  ERROR: {e}")
            errors += 1
            time.sleep(2)

    print(f"\n{'='*60}")
    print(f"  Done: {done} generated, {errors} errors, {len(existing)} pre-existing")
    print(f"{'='*60}")


def cmd_status(args):
    """Show generation status."""
    config = load_config(args.config)
    articles_dir = config.get('articles_dir', './articles')
    articles = config.get('articles', [])
    existing = get_existing(articles_dir)

    print(f"\n{config['shop_name']}:")
    print(f"  Defined: {len(articles)}")
    print(f"  Generated: {len(existing)}")
    print(f"  Missing: {len(articles) - len(existing)}")

    if len(articles) > len(existing):
        missing = [a['id'] for a in articles if a['id'] not in existing]
        print(f"  Missing IDs: {', '.join(missing[:20])}")
        if len(missing) > 20:
            print(f"    ... +{len(missing)-20} more")


def main():
    parser = argparse.ArgumentParser(description='SEO Article Generator for Upgates CMS')
    sub = parser.add_subparsers(dest='command')

    gen = sub.add_parser('generate', help='Generate articles')
    gen.add_argument('--config', required=True, help='Path to shop config JSON')
    gen.add_argument('--start', help='Start from article ID')
    gen.add_argument('--ids', help='Comma-separated article IDs to generate')
    gen.add_argument('--force', action='store_true', help='Regenerate existing articles')

    st = sub.add_parser('status', help='Show status')
    st.add_argument('--config', required=True, help='Path to shop config JSON')

    args = parser.parse_args()

    if args.command == 'generate':
        cmd_generate(args)
    elif args.command == 'status':
        cmd_status(args)
    else:
        parser.print_help()


if __name__ == '__main__':
    main()
