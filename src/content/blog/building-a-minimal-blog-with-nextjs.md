---
title: Building a Minimal Blog with Next.js
date: "2025-01-21"
excerpt: How I created this simple blog using Next.
---

# Building a Minimal Blog with Next.js

In this post, I'll walk through how I built this minimal blog using Next.js and markdown files.

## The Stack

This blog is built with:
- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Rosé Pine** color scheme
- **Markdown** for content

## Why This Approach

I wanted something simple and maintainable. By using markdown files for content, I can:
- Write posts in any text editor
- Version control my content
- Deploy easily to Vercel
- Keep the site fast and lightweight

## File Structure

The blog follows a simple structure:
```
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx          # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx      # Individual posts
│   └── ...
└── content/
    └── blog/
        ├── hello-world.md
        └── building-blog.md
```

This approach keeps everything simple and maintainable.