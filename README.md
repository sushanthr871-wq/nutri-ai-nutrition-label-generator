<p align="center">
  <img src="public/icon.svg" alt="NutriAI Logo" width="80" height="80" />
</p>

<h1 align="center">🍃 NutriAI — Automated Nutrition Analysis & Guidance</h1>

<p align="center">
  <b>AI-powered nutrition label generation for manufacturers and personalized dietary guidance for users.</b>
  <br/>
  FSSAI-compliant · Gemini AI · MongoDB · Next.js 16
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-8.9-47A248?logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Gemini_AI-2.0_Flash-4285F4?logo=google" alt="Gemini AI" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Models](#-database-models)
- [UI Components](#-ui-components)
- [Animations & Effects](#-animations--effects)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**NutriAI** is a full-stack web application that automates nutrition label generation and provides personalized dietary guidance. It serves two distinct user types:

- **Manufacturers** — Input recipe ingredients and get instant, FSSAI-compliant nutrition labels with downloadable exports and AI-powered nutritional insights.
- **Personal Users** — Analyze recipes against personal health goals (gym, weight loss, weight gain, normal), receive goal compatibility scoring, and get AI-suggested recipe improvements.

The system uses a **3-tier data lookup strategy**: MongoDB ingredient database → Google Gemini AI → local fallback database, ensuring fast responses and high availability.

---

## ✨ Features

### 🏭 Manufacturer Dashboard
- **Recipe Analysis** — Enter ingredients with quantities and units, get complete nutritional breakdown
- **FSSAI-Compliant Labels** — Auto-generated nutrition labels following FSSAI Schedule I guidelines
- **Nutrition Insights** — AI-powered quality assessment with positive aspects, concerns, and improvement suggestions
- **Label Export** — Download nutrition labels as high-resolution PNG images
- **Recipe History** — All analyzed recipes are auto-saved for future reference

### 👤 User Dashboard
- **Goal-Based Analysis** — Set your fitness goal (Gym, Weight Loss, Weight Gain, Normal) and analyze recipes against it
- **Goal Compatibility Scoring** — AI evaluates if a recipe aligns with your health objectives
- **Recipe Improvement** — AI suggests ingredient modifications to better match your goals
- **Nutrition Charts** — Visual breakdown with interactive pie charts (macronutrient distribution, daily value percentages)
- **Personalized Guidance** — Takes into account your age, weight, and goal for tailored advice
- **Recommended Recipes** — AI-curated recipe suggestions based on your dietary goals

### 🔐 Authentication
- **Role-Based Access** — Separate manufacturer and user flows with secure JWT authentication
- **Profile Setup** — Users complete a health profile (age, weight, goal) during onboarding
- **Secure Passwords** — bcrypt-hashed password storage

### 🎨 UI & Animations
- **Antigravity Particles** — Interactive 3D particle animation on the landing page (Three.js + React Three Fiber)
- **Typewriter Title** — "Smart Nutrition Simplified" types out character by character
- **Gradient Animation** — Flowing gradient background on authentication pages (Aceternity-style)
- **Dashboard Particles** — Canvas-based particle network with mouse-reactive behavior
- **Animated Cards** — Staggered entrance animations with glow-on-hover effects
- **Glassmorphism** — Frosted glass card effects throughout the dashboards

### 🗄️ Ingredient Database
- **MongoDB-Backed** — 25+ common ingredients with accurate nutrition data per 100g
- **3-Tier Lookup** — Database → AI → Local fallback for maximum reliability
- **Fuzzy Matching** — Case-insensitive search with partial and word-by-word matching
- **Seedable** — One API call populates the entire ingredient database

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Component Library** | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/), [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) |
| **AI** | [Google Gemini 2.0 Flash](https://ai.google.dev/) via [Vercel AI SDK](https://sdk.vercel.ai/) |
| **Database** | [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) |
| **Authentication** | JWT (jsonwebtoken) + bcryptjs |
| **Charts** | [Recharts](https://recharts.org/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation |
| **State Management** | [SWR](https://swr.vercel.app/) for server state |
| **Notifications** | [Sonner](https://sonner.emilkowal.dev/) toast notifications |
| **Fonts** | Inter + Space Grotesk (Google Fonts) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (Next.js)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ Landing  │  │   Auth   │  │   Dashboards     │   │
│  │  Page    │  │  Pages   │  │ (Manufacturer/   │   │
│  │          │  │          │  │    User)          │   │
│  └──────────┘  └──────────┘  └──────────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │ API Routes
┌────────────────────▼────────────────────────────────┐
│              Next.js API Layer                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ /api/auth│  │ /api/ai  │  │ /api/recipe      │   │
│  │ login    │  │ analyze  │  │ CRUD operations  │   │
│  │ register │  │ goal-chk │  └──────────────────┘   │
│  │ logout   │  │ improve  │  ┌──────────────────┐   │
│  │ me       │  │ insights │  │ /api/seed-       │   │
│  │ profile  │  │          │  │  ingredients     │   │
│  └──────────┘  └──────────┘  └──────────────────┘   │
└────────────────────┬────────────────────────────────┘
          ┌──────────┴──────────┐
          ▼                     ▼
┌──────────────────┐  ┌──────────────────┐
│    MongoDB       │  │  Google Gemini   │
│  ┌────────────┐  │  │    AI API        │
│  │ Users      │  │  │                  │
│  │ Recipes    │  │  │  gemini-2.0-     │
│  │ Ingredients│  │  │  flash           │
│  └────────────┘  │  │                  │
└──────────────────┘  └──────────────────┘
```

### Nutrition Analysis Flow (3-Tier Strategy)

```
User submits recipe
        │
        ▼
┌─ TIER 1: MongoDB ─────────────────────────┐
│ Look up ALL ingredients in the database    │
│ If ALL found → return instantly (no AI)    │
│ If PARTIAL → log missing, proceed to AI   │
│ If NONE → proceed to AI                   │
└────────────────┬──────────────────────────┘
                 │ (if not all found)
                 ▼
┌─ TIER 2: Google Gemini AI ────────────────┐
│ Send ingredients to Gemini 2.0 Flash      │
│ Get complete nutritional analysis         │
│ Validates for gibberish/invalid inputs    │
└────────────────┬──────────────────────────┘
                 │ (if AI fails)
                 ▼
┌─ TIER 3: Local Fallback DB ──────────────┐
│ 170+ hardcoded ingredients in memory     │
│ Fuzzy matching with word-level search    │
│ Always available, zero latency           │
└──────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
nutri-ai-nutrition-label/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, providers)
│   ├── page.tsx                  # Landing page
│   ├── globals.css               # Global styles & animations
│   ├── auth/
│   │   └── page.tsx              # Login/Register page
│   ├── setup-profile/
│   │   └── page.tsx              # User profile onboarding
│   ├── dashboard/
│   │   ├── manufacturer/
│   │   │   └── page.tsx          # Manufacturer dashboard
│   │   ├── user/
│   │   │   └── page.tsx          # User dashboard
│   │   ├── history/
│   │   │   └── page.tsx          # Recipe history
│   │   └── recommended/
│   │       └── page.tsx          # AI-recommended recipes
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts    # POST - Email/password login
│       │   ├── register/route.ts # POST - User registration
│       │   ├── logout/route.ts   # POST - Clear session
│       │   ├── me/route.ts       # GET  - Current user
│       │   └── profile/route.ts  # PUT  - Update profile
│       ├── ai/
│       │   ├── analyze/route.ts  # POST - Nutrition analysis (3-tier)
│       │   ├── goal-check/route.ts    # POST - Goal compatibility
│       │   ├── improve/route.ts       # POST - Recipe improvement
│       │   └── insights/route.ts      # POST - Nutrition insights
│       ├── recipe/route.ts       # POST/GET - Save/list recipes
│       └── seed-ingredients/route.ts  # POST - Seed ingredient DB
│
├── components/                   # React components
│   ├── antigravity.tsx           # Three.js particle animation
│   ├── animated-card.tsx         # Framer Motion card animations
│   ├── auth-form.tsx             # Login/register form
│   ├── background-paths.tsx      # Hero section with animations
│   ├── dashboard-background.tsx  # Canvas particle network
│   ├── dashboard-header.tsx      # Dashboard navigation bar
│   ├── goal-analysis-display.tsx # Goal compatibility UI
│   ├── goal-selector.tsx         # Fitness goal selector
│   ├── home-sections.tsx         # Landing page sections
│   ├── nutrition-charts.tsx      # Recharts visualizations
│   ├── nutrition-insights.tsx    # AI insights display
│   ├── nutrition-label.tsx       # FSSAI nutrition label
│   ├── recipe-input.tsx          # Ingredient input form
│   ├── recommended-recipes.tsx   # Recipe recommendations
│   ├── text-type.tsx             # Typewriter animation
│   ├── theme-provider.tsx        # Dark/light mode provider
│   └── ui/                      # shadcn/ui components (58 files)
│       ├── background-gradient-animation.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ... (54 more)
│
├── models/                       # Mongoose schemas
│   ├── User.ts                   # User model (manufacturer/user roles)
│   ├── Recipe.ts                 # Recipe model (ingredients, analysis)
│   └── Ingredient.ts             # Ingredient nutrition database
│
├── lib/                          # Utility functions
│   ├── mongodb.ts                # MongoDB connection singleton
│   ├── nutrition-db.ts           # Local fallback nutrition database
│   ├── auth.ts                   # JWT helpers
│   └── utils.ts                  # cn() utility (clsx + tailwind-merge)
│
├── hooks/
│   └── use-auth.ts               # Authentication hook (SWR)
│
├── styles/
│   └── globals.css               # Design tokens, animations, keyframes
│
├── public/                       # Static assets
│   ├── icon.svg                  # App icon
│   ├── icon-light-32x32.png
│   ├── icon-dark-32x32.png
│   └── apple-icon.png
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── .env.local                    # Environment variables (not committed)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **pnpm** (recommended) or npm or yarn
- **MongoDB** — either:
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community) (local)
  - [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud, free tier)
- **Google Gemini API Key** — [Get a free key](https://aistudio.google.com/apikey)

### 1. Clone the Repository

```bash
git clone https://github.com/Yellow-Bulldozer/nutri-ai-nutrition-label.git
cd nutri-ai-nutrition-label
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/nutri-ai

# JWT Secret (change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Google Gemini AI API Key
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key-here
```

> **Note:** If using MongoDB Atlas, your connection string will look like:
> `mongodb+srv://username:password@cluster.mongodb.net/nutri-ai`

### 4. Start the Development Server

```bash
pnpm dev
```

The app will be running at **http://localhost:3000**

### 5. Seed the Ingredient Database

After the server is running, seed the MongoDB ingredient database by making a POST request:

```bash
# Using PowerShell
Invoke-RestMethod -Method POST -Uri "http://localhost:3000/api/seed-ingredients"

# Using curl (Git Bash / macOS / Linux)
curl -X POST http://localhost:3000/api/seed-ingredients
```

You should see: `{"success": true, "message": "Seeded ingredients database: 25 inserted, 0 updated"}`

### 6. Build for Production

```bash
pnpm build
pnpm start
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT token signing | ✅ Yes |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Gemini API key for AI features | ✅ Yes |

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Create new account | `{ name, email, password, role }` |
| `POST` | `/api/auth/login` | Sign in | `{ email, password }` |
| `POST` | `/api/auth/logout` | Sign out | — |
| `GET` | `/api/auth/me` | Get current user | — |
| `PUT` | `/api/auth/profile` | Update profile | `{ age?, weight?, goal? }` |

### AI Analysis

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/ai/analyze` | Analyze recipe nutrition | `{ ingredients: [{name, quantity, unit}], servingSize }` |
| `POST` | `/api/ai/goal-check` | Check goal compatibility | `{ nutrition, goal, age, weight }` |
| `POST` | `/api/ai/improve` | Suggest recipe improvements | `{ ingredients, nutrition, goal }` |
| `POST` | `/api/ai/insights` | Get nutrition insights | `{ nutrition, servingSize }` |

### Recipes

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/recipe` | Save a recipe | `{ name, servingSize, ingredients, nutrition, ... }` |
| `GET` | `/api/recipe` | Get user's recipes | — |

### Database

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/seed-ingredients` | Seed ingredient database (25 items) |

### Example: Analyze a Recipe

```bash
curl -X POST http://localhost:3000/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": [
      {"name": "Rice", "quantity": 200, "unit": "g"},
      {"name": "Chicken", "quantity": 150, "unit": "g"},
      {"name": "Onion", "quantity": 50, "unit": "g"}
    ],
    "servingSize": 400
  }'
```

**Response:**
```json
{
  "nutrition": {
    "calories": 175.3,
    "protein": 13.2,
    "fat": 5.5,
    "saturatedFat": 1.5,
    "carbohydrates": 15.4,
    "sugar": 0.6,
    "sodium": 11.3,
    "fiber": 0.3,
    "fssaiCompliant": true,
    "fssaiNotes": "All mandatory FSSAI nutrition label fields are present. (Source: Database)"
  },
  "source": "database"
}
```

The `source` field indicates where the data came from:
- `"database"` — All ingredients found in MongoDB (fastest)
- `"ai"` — Processed by Google Gemini AI
- `"local-fallback"` — Used hardcoded local database

---

## 🗃️ Database Models

### User

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Full name |
| `email` | String | Unique, lowercase |
| `password` | String | bcrypt-hashed |
| `role` | Enum | `"manufacturer"` or `"user"` |
| `profile.age` | Number | Age (users only) |
| `profile.weight` | Number | Weight in kg (users only) |
| `profile.goal` | Enum | `"gym"`, `"weight_loss"`, `"weight_gain"`, `"normal"` |

### Recipe

| Field | Type | Description |
|-------|------|-------------|
| `userId` | ObjectId | Reference to User |
| `name` | String | Recipe name |
| `servingSize` | Number | Serving size in grams |
| `ingredients` | Array | `[{name, quantity, unit}]` |
| `nutrition` | Object | Calories, protein, fat, carbs, sugar, sodium, fiber, saturatedFat |
| `fssaiCompliant` | Boolean | FSSAI compliance status |
| `goalAnalysis` | Object | `{goal, suitable, aiComment, improvements}` |
| `improvedRecipe` | Object | `{ingredients, changes, recommendedFoods}` |

### Ingredient

| Field | Type | Description |
|-------|------|-------------|
| `ingredient_name` | String | Unique ingredient name |
| `nutrition_per_100g` | Object | `{energy_kcal, protein_g, carbohydrates_g, total_sugars_g, added_sugars_g, total_fat_g, saturated_fat_g, trans_fat_g, cholesterol_mg, sodium_mg}` |

#### Seeded Ingredients (25)

Egg, Rice, Wheat Flour, Potato, Onion, Tomato, Milk, Butter, Cheese, Chicken, Cooking Oil, Sugar, Salt, Garlic, Ginger, Carrot, Cabbage, Spinach, Paneer, Yogurt, Green Peas, Capsicum, Banana, Apple, Honey

---

## 🧩 UI Components

### Core Components

| Component | File | Description |
|-----------|------|-------------|
| `AuthForm` | `auth-form.tsx` | Login/register form with role selection |
| `RecipeInput` | `recipe-input.tsx` | Dynamic ingredient input with add/remove |
| `NutritionLabel` | `nutrition-label.tsx` | FSSAI-compliant nutrition label with PNG export |
| `NutritionCharts` | `nutrition-charts.tsx` | Recharts pie charts for macronutrient visualization |
| `NutritionInsights` | `nutrition-insights.tsx` | AI-generated quality assessment cards |
| `GoalSelector` | `goal-selector.tsx` | Fitness goal radio buttons |
| `GoalAnalysisDisplay` | `goal-analysis-display.tsx` | Goal compatibility results with improvement suggestions |
| `RecommendedRecipes` | `recommended-recipes.tsx` | AI-curated recipe suggestions |
| `DashboardHeader` | `dashboard-header.tsx` | Navigation bar with role-based links |

### Animation Components

| Component | File | Description |
|-----------|------|-------------|
| `Antigravity` | `antigravity.tsx` | Three.js interactive particle system (landing hero) |
| `BackgroundPaths` | `background-paths.tsx` | Hero section wrapper with Antigravity + TextType |
| `TextType` | `text-type.tsx` | Typewriter text animation |
| `DashboardBackground` | `dashboard-background.tsx` | Canvas particle network for dashboards |
| `AnimatedCard` | `animated-card.tsx` | Framer Motion card with glow-on-hover |
| `BackgroundGradientAnimation` | `ui/background-gradient-animation.tsx` | Flowing gradient blobs (auth pages) |

---

## 🎨 Animations & Effects

### Landing Page
- **Antigravity Particles** — 400 interactive 3D particles rendered via Three.js + React Three Fiber. Particles follow the mouse cursor in a ring formation with wave effects. Color: `#509b4b` (NutriAI green).
- **Typewriter Title** — "Smart Nutrition Simplified" types out character-by-character at 80ms per character with a blinking cursor. Non-looping.
- **Smooth Scroll** — "Explore" button with bouncing chevron scrolls to the role selection section.

### Auth Pages
- **Gradient Animation** — 5 animated radial gradient blobs with CSS keyframe animations (`moveVertical`, `moveInCircle`, `moveHorizontal`). Interactive mouse-following 6th blob. Green-themed palette.
- **Glassmorphism Form** — `bg-black/40 backdrop-blur-xl` frosted glass card.

### Dashboards
- **Particle Network** — 60 canvas-based particles with:
  - Soft radial glow effects
  - Connecting lines between particles within 180px
  - Mouse-reactive repulsion
  - Pulsating opacity and size
  - Manufacturer variant: deeper greens (hue 120–160)
  - User variant: brighter teals (hue 140–180)
- **Staggered Card Entrances** — Cards slide up and fade in with 100ms stagger delays.
- **Glow-on-Hover** — Gradient border glow that appears when hovering over cards.
- **Animated Titles** — Slide-in from left with easing.

### Color Palette

| Usage | Color | Hex |
|-------|-------|-----|
| Primary Green | NutriAI Brand | `#509b4b` |
| Accent Emerald | Buttons & Focus states | `#059669` |
| Dark Background | Auth gradient start | `rgb(16, 40, 18)` |
| Particle Glow | Dashboard particles | `hsl(120-180, 60%, 50%)` |
| Card Glow | Hover effects | `rgba(80, 155, 75, 0.3)` |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and not currently licensed for public distribution.

---

<p align="center">
  Made with 💚 by <b>NutriAI Team</b>
</p>
# nutri-ai-nutrition-label
