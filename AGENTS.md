# Agent Guidelines for Personal Blog

## Build Commands

- `bun dev` / `npm run dev` - Start development server
- `bun run build` / `npm run build` - Build for production (includes frontmatter validation)
- `bun run start` / `npm run start` - Start production server
- `bun run lint` / `npm run lint` - Run ESLint (Next.js + TypeScript config)
- `bun run validate:frontmatter` / `npm run validate:frontmatter` - Validate blog post frontmatter
- `bun test` - Run Jest tests

## Code Style Guidelines

### Project Setup

- Next.js 16 with App Router, deployed on Vercel
- Bun package manager (preferred) with npm fallback
- TypeScript strict mode enabled

### Imports & Components

- Use `@/*` path aliases for src imports
- Functional components with default exports
- Add `'use client'` directive for client-side components
- Group imports: external libs first, then internal

### TypeScript

- Strict typing required for all props and returns
- Use `Readonly<{children: React.ReactNode}>` for children props
- Follow Next.js App Router patterns

### Styling

- CSS Modules (import styles from "./Component.module.css")
- CSS variables: --background, --text, --pine
- kebab-case for CSS classes, PascalCase for components, camelCase for variables
