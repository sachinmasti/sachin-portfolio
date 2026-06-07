# Portfolio Architecture

This portfolio uses a scalable Next.js App Router architecture with typed data, reusable UI primitives, animation helpers, and isolated feature sections.

## Structure

- `src/app`: Next.js layout and page composition.
- `src/components`: Section and UI components grouped by feature.
- `src/data`: Typed content for navigation, skills, projects, blogs, and social links.
- `src/chatbot`: Offline chatbot knowledge files and matching logic.
- `src/animations`: Shared Framer Motion variants.
- `src/hooks`: Browser-only utilities.
- `src/lib`: Small framework-agnostic helpers.
- `src/styles`: Global Tailwind CSS and base styling.
- `src/types`: Shared TypeScript types.

## Rendering Model

The page is composed from focused sections in `src/app/page.tsx`. Visual and interactive sections are client components because they use Framer Motion, browser events, EmailJS, fetch, or React Three Fiber.

## Extending Projects

Add new entries to `src/data/projects.ts`. The `Projects` component renders the data without requiring layout changes.

## Extending Blog

Add posts to `src/data/blog.ts`. A future RSS integration can replace or enrich that data source while keeping the component contract stable.
