# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## PROJECT

**Threadly** — a premium streetwear t-shirt e-commerce landing page.

---

## STACK

| Layer       | Technology                                                   |
|-------------|--------------------------------------------------------------|
| Frontend    | React 18 · Vite · TypeScript · TailwindCSS · Framer Motion · React Router |
| Backend     | Node.js · Express · MongoDB (Mongoose) · Zod (validation)   |
| Tooling     | ESLint · Prettier · Husky · pnpm workspaces                 |

---

## FOLDER STRUCTURE

```
/
├── apps/
│   ├── web/          # React + Vite frontend
│   └── api/          # Node.js + Express backend
├── packages/
│   └── shared/       # Shared TypeScript types (consumed by web and api)
├── pnpm-workspace.yaml
└── CLAUDE.md
```

---

## CONVENTIONS

### TypeScript
- Never use `any`. All types must be explicit or inferred from Zod schemas.
- Zod schemas live in `packages/shared`; infer TypeScript types from them with `z.infer<>`.

### Components
- PascalCase filenames, one component per file.
- Co-locate component styles (Tailwind classes inline or a sibling `.module.css` if needed).
- Place shared UI in `apps/web/src/components/`, page-level components in `apps/web/src/pages/`.

### API Routes
- RESTful, versioned under `/api/v1/`.
- Request/response bodies validated with Zod on every route.
- Return consistent JSON shape: `{ success: boolean, data?: T, error?: string }`.

### Commits
Follow **Conventional Commits**:
- `feat:` new feature
- `fix:` bug fix
- `chore:` tooling, deps, config
- `docs:` documentation only
- `refactor:` no behaviour change

---

## DESIGN SYSTEM

| Token           | Value                              |
|-----------------|------------------------------------|
| Primary         | `#0F0F0F` (off-black)              |
| Accent          | `#FF4D00` (orange)                 |
| Neutral scale   | Tailwind `zinc-50` → `zinc-900`    |
| Body font       | Inter                              |
| Display font    | Bricolage Grotesque                |
| Border radius   | `rounded-2xl` (default)            |
| Spacing scale   | Tailwind default                   |

---

## DO NOT

- Install packages without asking first.
- Run `npm install` globally — use `pnpm` only.
- Modify any `.env` file without explicit confirmation.
- Push directly to `main`.
