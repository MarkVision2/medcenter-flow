# Medcenter Flow

Vite + React + TypeScript landing project with Supabase edge functions.

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Scripts

```bash
npm run dev       # local development
npm run build     # production build
npm run preview   # preview production build
npm run lint      # eslint
npm run test      # vitest
```

## Environment Variables

Keep real values in `.env` locally and in Vercel project environment variables. Do not commit `.env`.

Required variables:

```bash
VITE_SUPABASE_PROJECT_ID=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
```

## Deploy

After the project is linked to Vercel:

```bash
vercel deploy
vercel deploy --prod
```
