# Sachin Masti Portfolio

Premium futuristic personal portfolio for Sachin Masti, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, Three.js, React Icons, and EmailJS.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## EmailJS

Copy `.env.example` to `.env.local` and add your EmailJS keys:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

The contact form sends `name`, `email`, `message`, and `to_email`.
