<div align="center">

<br />


<h3>⟁ &nbsp; Data Science · Machine Learning · Built in Public &nbsp; ⟁</h3>

<br />

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://sachinmasti.dev)

<br />

> **"Finding Signals in the Noise — turning raw data into clarity, one model at a time."**

<br />

🌐 **[sachinmasti.dev](https://sachinmasti.dev)** &nbsp;·&nbsp; 📓 **[Medium Blog](https://medium.com/@Sachinmasti)** &nbsp;·&nbsp; 🐙 **[GitHub](https://github.com/sachinmasti)**

<br />

</div>

---

## ✦ What is this?

A **premium single-page portfolio** built with a cinematic scroll-driven experience — not a template, not a theme. Every section is handcrafted with purpose.

As you scroll, you travel through space: starting at the Milky Way galaxy → passing through a solar system → approaching Earth. Each stage of the journey mirrors a stage in the professional story — from foundations to production deployments.

This isn't just a portfolio. It's a **narrative told in code**.

---

## ✦ Live Demo

<div align="center">

| Page | URL |
|---|---|
| 🌐 Portfolio | [sachinmasti.dev](https://sachinmasti.dev) |
| 📓 Blog | [medium.com/@Sachinmasti](https://medium.com/@Sachinmasti) |
| 🐙 GitHub | [github.com/sachinmasti](https://github.com/sachinmasti) |

</div>

---

## ✦ Tech Stack

<div align="center">

| Layer | Technology | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | SSR, routing, performance |
| Language | **TypeScript** | Type safety across the entire codebase |
| Styling | **Tailwind CSS v4** | Utility-first, design token system |
| Animation | **Framer Motion** | Scroll-driven section transitions |
| 3D Engine | **React Three Fiber + Three.js** | WebGL scenes — galaxy, solar system, Earth |
| Icons | **React Icons** | Consistent iconography |
| Contact | **EmailJS** | Server-free form submissions |
| Font | **Inter** via `next/font` | Clean, professional, fast |
| Deployment | **Vercel** | Zero-config CI/CD |

</div>

---

## ✦ Features

### 🌌 Cosmic 3D Journey
A scroll-driven WebGL experience built entirely in React Three Fiber. The camera travels through four distinct stages as the user scrolls down the page:

| Stage | Scene | Section |
|---|---|---|
| 1 | Milky Way — 4-arm spiral with 12,000 particles + nebula gas clouds | Hero |
| 2 | Asteroid field — 120 procedural irregular rocks (displaced icosahedrons) | About |
| 3 | Procedural solar system with orbiting planets | Skills · Story |
| 4 | Earth with cloud layer approaching | Projects · Contact |

### ✦ Particle Morphing Background
4,000 particles that dynamically morph between geometric shapes — triangle, circle, diamond, square — driven by scroll position, with section-aware color tinting using the Tiffany accent.

### 🤖 AI Chatbot (Claude-powered)
An in-page assistant that answers visitor questions about skills, projects, and contact details in real time. Includes markdown link support and an off-topic guard to keep conversations focused.

### 🚀 Scroll Progress Navigator
A fixed side navigation featuring:
- A **rocket icon** that travels vertically as the user scrolls
- **Star markers** anchoring each section
- **Tiffany glow** pulse effect on the active section

### 🎮 Offline Easter Egg Game
When the browser goes offline, a canvas-based **spaceship survival game** activates automatically. Fly with arrow/WASD keys, collect `✦ data points`, dodge asteroids. Fully playable — no internet required.

### 🖱️ Magnetic Custom Cursor
A custom cursor with a ring-follower and **magnetic hover effect** that snaps to interactive elements — buttons, links, cards.

### 📬 EmailJS Contact Form
Serverless contact form that sends `name`, `email`, `message`, and `to_email` directly via EmailJS — no backend required.

### 📊 Live GitHub Stats
Real-time GitHub profile data fetched from the GitHub API — repos, contributions, and public activity, rendered live on every visit.

### 📱 Fully Responsive
Mobile-first layout with adjusted typography, grid breakpoints, and timeline reflows for all screen sizes.

---

## ✦ Project Structure

```
sachin-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — CosmicJourney, Cursor, ScrollProgress, OfflineGame
│   │   └── page.tsx            # Landing page composing all sections
│   │
│   ├── components/
│   │   ├── ui/                 # Reusable UI — CosmicJourney, OfflineGame, TechLogo, etc.
│   │   ├── chatbot/            # AI chatbot component
│   │   ├── contact/            # Contact form with EmailJS integration
│   │   ├── github/             # GitHub stats section
│   │   ├── hero/               # Hero — tagline, CTA, intro text
│   │   ├── navbar/             # Sticky navigation bar
│   │   ├── projects/           # Project cards (Airbnb NYC, Spam Classifier)
│   │   ├── sections/           # About, Story, Blog sections
│   │   └── skills/             # Skills grid
│   │
│   ├── chatbot/                # Knowledge base for the AI assistant
│   ├── data/                   # Static data — navigation, projects, skills
│   ├── hooks/                  # Custom React hooks
│   ├── animations/             # Framer Motion variants
│   ├── styles/                 # Global CSS and Tailwind layers
│   └── types/                  # TypeScript type definitions
│
├── public/                     # Static assets
├── .env.example                # Environment variable template
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## ✦ Design System

<div align="center">

| Token | Hex | Preview | Usage |
|---|---|---|---|
| `tiffany` | `#21F1A8` | 🟢 | Primary accent — buttons, links, glow, Earth color |
| `void` | `#0a0a0f` | ⬛ | Background — deep space black |
| `bone` | `#f0ede6` | 🟫 | Primary text |
| `smoke` | `#a0a0a0` | 🩶 | Secondary / muted text |
| `amber-spark` | `#ffb829` | 🟡 | Secondary accent — highlights |
| `lichen` | `#15846e` | 🟩 | Tertiary accent |

</div>

---

## ✦ Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/sachinmasti/sachin-portfolio.git
cd sachin-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your EmailJS credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

> Get your keys from [emailjs.com/account](https://www.emailjs.com/account/)

### Build for Production

```bash
npm run build
npm run start
```

---

## ✦ Deployment

The site is deployed on **Vercel** with automatic CI/CD on every push to `main`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sachinmasti/sachin-portfolio)

**Live URL:** [sachinmasti.dev](https://sachinmasti.dev)

---

## ✦ Featured Projects

### 🏙️ Airbnb NYC Price Predictor
> Regression model trained on the 2019 NYC Airbnb dataset to predict listing prices.  
> Built with Python, CatBoost, and feature engineering (Haversine distance, TF-IDF, binary text flags). Deployed on Render.

### 📧 Spam Classifier
> Text classification model to detect spam messages.  
> Built with Python and NLP techniques (TF-IDF, Naive Bayes). Deployed as a web app on Render.

---

## ✦ Blog

Writing to document the learning journey, not just the wins.

| Post | Platform |
|---|---|
| [Hyperparameter Tuning with Optuna](https://medium.com/@Sachinmasti) | Medium |

---

## ✦ Contact

Have a project idea or just want to connect?

📧 **sachinmasti88@gmail.com**  
🌐 **[sachinmasti.dev/#contact](https://sachinmasti.dev/#contact)**

---

<div align="center">

<br />

**⟁ Built in public. Learning out loud. One commit at a time. ⟁**

<br />

<sub>Made with Next.js · TypeScript · Tailwind CSS · React Three Fiber · Framer Motion</sub>

<br />

</div>