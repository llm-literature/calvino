# Project Calvino - AI Agent Instructions

This document provides context and instructions for AI agents working on the **Calvino** project. It outlines the architecture, technology stack, development workflows, and coding conventions to ensure consistent and high-quality contributions.

## 1. Project Overview
**Calvino** is a web application dedicated to Italo Calvino's "Invisible Cities". It serves as a digital archive and visualization of the cities described in the book.
- **Repository**: `llm-literature/calvino`
- **Type**: Static Web Application (Next.js SSG)

## 2. Technology Stack
- **Runtime & Package Manager**: [Bun](https://bun.sh/) (v1.2+)
- **Framework**: [Next.js](https://nextjs.org/) (v16+, App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/) (v4.0+)
  - [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives + Tailwind)
  - `lucide-react` for icons
- **Linting**: ESLint (v8, pinned for compatibility)
- **Deployment**: Static Export (`output: 'export'`)

## 3. Project Structure
```
calvino/
├── app/                    # Next.js App Router directory
│   ├── city/               # City-related routes
│   │   ├── [cityType]/     # Dynamic route for city categories
│   │   │   └── [cityName]/ # Dynamic route for specific cities
│   │   └── page.tsx        # City listing page
│   ├── components/         # Application-specific components (Business Logic)
│   ├── globals.css         # Global styles & Tailwind v4 theme configuration
│   ├── layout.tsx          # Root layout (Server Component)
│   └── page.tsx            # Landing page
├── components/             # Shared UI components
│   └── ui/                 # Shadcn UI primitives (Button, Avatar, etc.)
├── lib/                    # Utility functions (cn, etc.)
├── public/                 # Static assets
│   └── city/
│       └── data.json       # Data source for cities
├── tailwind.config.ts      # Tailwind configuration (Legacy/Hybrid)
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## 4. Development Workflow

### Installation
```bash
bun install
```

### Development Server
```bash
bun run dev
```
Runs on `http://localhost:3000`.

### Production Build
```bash
bun run build
```
Generates static files in the `out/` directory (implied by `output: 'export'`).

### Linting
```bash
bun run lint
```
**Note**: ESLint is pinned to v8. Do not upgrade to v9 without resolving config compatibility.

## 5. Coding Conventions & Guidelines

### Styling (Tailwind CSS v4)
- Use **Tailwind CSS v4** syntax.
- CSS variables for the theme are defined in `app/globals.css` under the `@theme` block.
- Use `shadcn/ui` components located in `components/ui/` for base interactive elements.
- Prefer `clsx` and `tailwind-merge` (via `lib/utils.ts` `cn()` function) for conditional class merging.

### Components
- **Server Components**: Default for `page.tsx` and `layout.tsx`. Use for data fetching and metadata.
- **Client Components**: Mark with `'use client'` at the top. Required for interactivity (hooks, event listeners) and some Shadcn components (e.g., `Dialog`, `Popover`).
- **Refactoring**: When modifying UI, ensure responsiveness (mobile-first approach).

### Data Fetching
- The project uses **Static Site Generation (SSG)**.
- City data is sourced from `public/city/data.json`.
- Dynamic routes (`app/city/[cityType]/[cityName]/page.tsx`) use `generateStaticParams` to pre-render all city pages at build time.
- **Important**: In Next.js 15/16, route `params` are asynchronous. Always `await params` in dynamic pages.

### Image Handling
- Use `next/image`.
- **Constraint**: Image Optimization is **disabled** (`unoptimized: true` in `next.config.js`) because the project is exported as a static site and does not use a Node.js server for image processing at runtime.

## 6. Common Tasks

### Adding a New Shadcn Component
1.  Check if the primitive is installed (`@radix-ui/react-*`).
2.  Create the component file in `components/ui/`.
3.  Ensure it uses the `cn()` utility for class merging.

### Updating City Data
1.  Modify `public/city/data.json`.
2.  Run `bun run build` to regenerate the static pages.

### Modifying Global Theme
1.  Edit `app/globals.css`.
2.  Update CSS variables inside the `@theme` block or `:root`.

## 7. Known Issues & Gotchas
- **ESLint**: Do not run `bun update` blindly on `eslint`. Keep it at v8.
- **Tailwind v4**: The configuration is a hybrid of `app/globals.css` (CSS-first) and `tailwind.config.ts`. Be careful when moving config between them.
- **Static Export**: API routes and server-side image optimization are not available.

## 8. Future Roadmap
- [ ] Add search functionality for cities.
- [ ] Improve accessibility (a11y) scores.
- [ ] Add more animations using `tailwindcss-animate`.
