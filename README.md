# next-ssr-isr-listing

A small demo application built with **Next.js** (App Router) that showcases server‑side rendering (SSR), incremental static regeneration (ISR), basic SEO metadata and friendly page states (loading, error and empty) for a list of products.  The goal of this project is to provide a clean, well‑structured example of how to build a data‑driven page in Next.js using good practices, TypeScript and a minimal design.

> **Note on versions**
>
> This project uses Next.js&nbsp;14 (version&nbsp;`14.2.35`) because it is the latest stable release recommended by the Next.js team as of December&nbsp;2025【354917004412805†L94-L100】.  Using a patched 14.2.x version avoids recent vulnerabilities disclosed in React Server Components and the App Router.

## Goal

* Demonstrate SSR and ISR on a `/products` listing page.
* Provide SEO metadata and a canonical URL.
* Display proper loading, error and empty states without client‑side JavaScript.
* Use a local mock API so data can be edited easily to observe ISR in action.

## Stack

* [Next.js App Router](https://nextjs.org/docs) (SSR, ISR)
* TypeScript throughout the codebase
* Tailwind CSS for quick and responsive styling
* Fetch API with a simple data layer and custom error handling
* Vitest for unit tests
* ESLint and Prettier for code quality

## Features

* **Server‑side rendering**: The `/products` page renders on the server on first request.  No `"use client"` is used on this page, so the initial HTML contains the product cards without requiring client JavaScript.
* **Incremental static regeneration (ISR)**: The products listing is cached and automatically re‑rendered in the background every `60` seconds (`revalidate` value).  After the revalidation period, the next request will trigger a rebuild and return updated content.
* **SEO metadata**: Both the listing and individual product pages specify titles, descriptions and canonical URLs via `generateMetadata` functions.
* **Page states**: Dedicated components for loading, error and empty states provide good user experience.  Errors thrown by the data layer are caught by Next.js and displayed via a friendly error boundary.
* **Clean architecture**: Data fetching and normalisation logic lives in `src/lib`.  Types are defined in `src/types`.  UI components are small and reusable.  The API route uses the same data source as the server component.
* **Unit tests**: A handful of tests exercise the data normalisation logic and error handling.

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run in development**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.  Visit `/products` to see the list.

3. **Run the tests**

   ```bash
   npm test
   ```

4. **Lint and format**

   ```bash
   npm run lint    # check for lint issues
   npm run format  # automatically format the codebase
   ```

## How to verify ISR

The products page uses ISR with a `revalidate` interval of **60 seconds**.  To see ISR in action:

1. Start the dev server with `npm run dev` and navigate to `http://localhost:3000/products`.
2. Open the file `src/data/products.ts` in your editor and modify one of the product titles or add/remove products.  Save the file.
3. Wait at least `60` seconds.  The page is currently serving the cached version.
4. Refresh the `/products` page in your browser *after* the revalidation period.  You should see your changes reflected.  This demonstrates that the page was regenerated in the background using ISR.

The `revalidate` setting is defined at the top of `app/products/page.tsx`:

```ts
// app/products/page.tsx
export const revalidate = 60;
```

## Project structure

The repository uses a simple and predictable layout:

```
next-ssr-isr-listing/
├── app/
│   ├── layout.tsx             # root layout with global styles
│   ├── page.tsx               # home page, links to /products
│   └── products/
│       ├── page.tsx           # server component with SSR & ISR
│       ├── loading.tsx        # loading state placeholder
│       ├── error.tsx          # error boundary UI
│       └── [id]/
│           ├── page.tsx       # product detail page (optional)
│           └── not-found.tsx  # custom 404 for missing products
├── src/
│   ├── data/
│   │   └── products.ts        # mock product data (edit to test ISR)
│   ├── lib/
│   │   └── products.ts        # data fetching & normalisation logic
│   ├── types/
│   │   └── product.ts         # TypeScript interfaces
│   └── components/
│       ├── ProductCard.tsx    # product card UI
│       ├── ProductGrid.tsx    # responsive grid layout
│       └── EmptyState.tsx     # shown when no products
├── tests/
│   └── products.test.ts       # unit tests for data layer
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── .eslintrc.cjs              # ESLint configuration
├── .prettierrc.json           # Prettier configuration
├── vitest.config.ts           # Vitest configuration
├── next.config.mjs            # Next.js configuration
└── README.md                  # project documentation (this file)
```

## Scripts

| Script          | Description                                           |
|-----------------|-------------------------------------------------------|
| `npm run dev`   | Start the development server on `localhost:3000`.     |
| `npm run build` | Build the application for production.                 |
| `npm run start` | Start the production build (`next start`).           |
| `npm run lint`  | Run ESLint to check for problems.                    |
| `npm run format`| Format all files using Prettier.                     |
| `npm run test`  | Run unit tests with Vitest.                          |

## Environment variables

There are no required environment variables for this project.  An example `.env.example` file is provided for illustration.  You can use it as a template if you decide to add variables later.