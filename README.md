# Adcraft

A high-contrast, motion-led React experience for creating and managing paid and organic social campaigns. It includes the landing page, onboarding, and a responsive product dashboard with Meta Ads and Social Studio workflows.

## Run locally

```bash
npm install
npm run dev
```

Open the dashboard directly at `/?view=dashboard`. Add `&tab=ads` or `&tab=studio` to deep-link into either workspace.

## Backend configuration

Copy `.env.example` to `.env.local` and point both variables at the same ARIA services used by the original app. Until auth tokens and those variables are present, dashboard actions intentionally use demo data so the complete UX remains testable.

## Production build

```bash
npm run build
```
