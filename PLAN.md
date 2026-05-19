# PLAN.md — Threadly Project Plan

> Status: AWAITING APPROVAL — do not begin implementation until confirmed.

---

## 1. Full Folder Structure

```
threadly/
├── apps/
│   ├── web/                                  # React 18 + Vite + TypeScript frontend
│   │   ├── public/
│   │   │   └── fonts/                        # Self-hosted Inter & Bricolage Grotesque
│   │   ├── src/
│   │   │   ├── assets/                       # Images, icons, SVGs
│   │   │   ├── components/                   # Shared/reusable UI components
│   │   │   │   ├── ui/                       # Primitives: Button, Badge, Card, Input
│   │   │   │   ├── layout/                   # Navbar, Footer, Section wrappers
│   │   │   │   └── sections/                 # One file per landing page section
│   │   │   │       ├── Hero.tsx
│   │   │   │       ├── FeaturedCollection.tsx
│   │   │   │       ├── CategoryGrid.tsx
│   │   │   │       ├── BestSellers.tsx
│   │   │   │       ├── Testimonials.tsx
│   │   │   │       └── NewsletterCTA.tsx
│   │   │   ├── hooks/                        # Custom React hooks
│   │   │   │   ├── useProducts.ts
│   │   │   │   ├── useTestimonials.ts
│   │   │   │   └── useNewsletter.ts
│   │   │   ├── lib/                          # Axios instance, query client config
│   │   │   │   └── api.ts
│   │   │   ├── pages/                        # Route-level page components
│   │   │   │   └── Home.tsx
│   │   │   ├── router/
│   │   │   │   └── index.tsx                 # React Router config
│   │   │   ├── styles/
│   │   │   │   └── globals.css               # Tailwind directives + font imports
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── api/                                  # Node.js + Express backend
│       ├── src/
│       │   ├── config/
│       │   │   └── db.ts                     # Mongoose connection
│       │   ├── controllers/
│       │   │   ├── product.controller.ts
│       │   │   ├── category.controller.ts
│       │   │   ├── testimonial.controller.ts
│       │   │   └── newsletter.controller.ts
│       │   ├── middleware/
│       │   │   ├── errorHandler.ts
│       │   │   └── validate.ts               # Zod middleware factory
│       │   ├── models/
│       │   │   ├── Product.model.ts
│       │   │   ├── Category.model.ts
│       │   │   ├── Testimonial.model.ts
│       │   │   └── Subscriber.model.ts
│       │   ├── routes/
│       │   │   └── v1/
│       │   │       ├── index.ts              # Mounts all v1 routers
│       │   │       ├── product.routes.ts
│       │   │       ├── category.routes.ts
│       │   │       ├── testimonial.routes.ts
│       │   │       └── newsletter.routes.ts
│       │   ├── schemas/                      # Zod request schemas (re-exported from shared)
│       │   └── server.ts                     # Express app entry
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   └── shared/                               # Consumed by both apps via pnpm workspace
│       ├── src/
│       │   ├── schemas/                      # Zod schemas (single source of truth)
│       │   │   ├── product.schema.ts
│       │   │   ├── category.schema.ts
│       │   │   ├── testimonial.schema.ts
│       │   │   └── newsletter.schema.ts
│       │   └── index.ts                      # Re-exports everything
│       ├── tsconfig.json
│       └── package.json
│
├── .husky/
│   ├── pre-commit                            # lint-staged
│   └── commit-msg                           # commitlint
├── .eslintrc.cjs
├── .prettierrc
├── commitlint.config.cjs
├── pnpm-workspace.yaml
├── package.json                             # Root — scripts only, no deps
├── CLAUDE.md
└── PLAN.md
```

---

## 2. Landing Page Sections (render order)

| # | Section | Description |
|---|---------|-------------|
| 1 | **Navbar** | Logo, nav links, cart icon, mobile hamburger menu |
| 2 | **Hero** | Full-viewport, animated headline, CTA button, product image |
| 3 | **Featured Collection** | Horizontally scrollable cards for the season drop |
| 4 | **Category Grid** | 2×2 or 3-column grid (Oversized, Graphics, Basics, Collabs) |
| 5 | **Best Sellers** | Product cards with rating, price, quick-add button |
| 6 | **Testimonials** | Auto-scrolling customer quote carousel |
| 7 | **Newsletter CTA** | Email input, submit, success state with Framer Motion |
| 8 | **Footer** | Links, socials, legal, brand tagline |

---

## 3. API Endpoints

### Products
```
GET    /api/v1/products                  # All products (supports ?featured=true, ?limit=)
GET    /api/v1/products/best-sellers     # Top N by salesCount
GET    /api/v1/products/:id              # Single product
```

### Categories
```
GET    /api/v1/categories                # All active categories
GET    /api/v1/categories/:slug          # Category with products
```

### Testimonials
```
GET    /api/v1/testimonials              # All approved testimonials
```

### Newsletter
```
POST   /api/v1/newsletter/subscribe      # Subscribe with email
```

---

## 4. Mongoose Models

### `Product`
```
_id          ObjectId
name         String       required
slug         String       required, unique
description  String
price        Number       required, min: 0
comparePrice Number       (original price for "sale" badge)
images       [String]     URLs
category     ObjectId     ref: Category
tags         [String]
sizes        [String]     enum: XS | S | M | L | XL | XXL
colors       [{ name: String, hex: String }]
featured     Boolean      default: false
salesCount   Number       default: 0
inStock      Boolean      default: true
createdAt    Date
updatedAt    Date
```

### `Category`
```
_id          ObjectId
name         String       required
slug         String       required, unique
image        String       URL
description  String
active       Boolean      default: true
sortOrder    Number       default: 0
createdAt    Date
updatedAt    Date
```

### `Testimonial`
```
_id          ObjectId
author       String       required
location     String
avatar       String       URL
rating       Number       required, min: 1, max: 5
body         String       required
productRef   ObjectId     ref: Product (optional)
approved     Boolean      default: false
createdAt    Date
```

### `Subscriber`
```
_id          ObjectId
email        String       required, unique, lowercase
subscribedAt Date         default: Date.now
active       Boolean      default: true
```

---

## 5. Dependencies (exact versions)

### `apps/web`
```jsonc
// dependencies
"react": "18.3.1",
"react-dom": "18.3.1",
"react-router-dom": "6.24.1",
"framer-motion": "11.3.8",
"axios": "1.7.3",
"@tanstack/react-query": "5.51.1",

// devDependencies
"typescript": "5.5.4",
"vite": "5.3.4",
"@vitejs/plugin-react": "4.3.1",
"tailwindcss": "3.4.7",
"postcss": "8.4.40",
"autoprefixer": "10.4.19",
"@types/react": "18.3.3",
"@types/react-dom": "18.3.0",
"eslint": "9.8.0",
"eslint-plugin-react-hooks": "4.6.2",
"prettier": "3.3.3"
```

### `apps/api`
```jsonc
// dependencies
"express": "4.19.2",
"mongoose": "8.5.2",
"zod": "3.23.8",
"dotenv": "16.4.5",
"cors": "2.8.5",
"helmet": "7.1.0",
"morgan": "1.10.0",

// devDependencies
"typescript": "5.5.4",
"tsx": "4.16.2",
"@types/express": "4.17.21",
"@types/cors": "2.8.17",
"@types/morgan": "1.9.9",
"nodemon": "3.1.4"
```

### `packages/shared`
```jsonc
// dependencies
"zod": "3.23.8",

// devDependencies
"typescript": "5.5.4"
```

### Root (workspace tooling)
```jsonc
"husky": "9.1.4",
"lint-staged": "15.2.8",
"@commitlint/cli": "19.4.0",
"@commitlint/config-conventional": "19.2.2",
"prettier": "3.3.3"
```

---

## 6. Phase-Wise Execution Order

### Phase 1 — Monorepo Scaffold
- Init root `package.json` + `pnpm-workspace.yaml`
- Configure ESLint, Prettier, Husky, commitlint, lint-staged
- Create `packages/shared` with base tsconfig

### Phase 2 — Shared Types & Schemas
- Write all Zod schemas in `packages/shared/src/schemas/`
- Export inferred TypeScript types from each schema
- Build & verify the package resolves correctly from both apps

### Phase 3 — Backend (API)
- Bootstrap Express server with helmet, cors, morgan
- Connect Mongoose; create all four models
- Implement controllers + routes for all endpoints
- Add Zod validation middleware
- Seed script for dev data (products, categories, testimonials)

### Phase 4 — Frontend Foundation
- Scaffold Vite + React + TypeScript + TailwindCSS
- Configure design tokens (colors, fonts, radius) in `tailwind.config.ts`
- Set up React Router, TanStack Query, Axios instance
- Build UI primitives: `Button`, `Badge`, `Card`, `Input`
- Build layout shells: `Navbar`, `Footer`

### Phase 5 — Landing Page Sections
Build in render order, top to bottom:
1. Hero
2. FeaturedCollection
3. CategoryGrid
4. BestSellers
5. Testimonials
6. NewsletterCTA

### Phase 6 — Integration & Polish
- Wire all sections to live API via custom hooks
- Add Framer Motion entrance animations per section
- Responsive pass (mobile → tablet → desktop)
- Loading skeletons + error states

### Phase 7 — QA & Tooling
- ESLint + type-check clean (`tsc --noEmit`)
- Prettier format pass
- Verify Husky hooks fire correctly
- Cross-browser smoke test
