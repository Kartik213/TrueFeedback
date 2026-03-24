# True Feedback

Anonymous feedback platform rebuilt to reflect stronger full-stack engineering judgment after 2 years of professional experience.

This project started as an older React + Express app and was reworked into a modern **Next.js App Router** application with **Auth.js**, **MongoDB/Mongoose**, and a deployment-aware architecture for **Vercel**. The goal was not just to rebuild the UI, but to improve the decisions behind the product: auth design, server boundaries, UX quality, feature resilience, and low-cost infrastructure choices.

## Core Product Flow

Users can create an account, share a public profile link, and receive anonymous messages. Logged-in users manage messages from a private dashboard, control whether they are accepting new messages, copy their public link, and delete messages. On the public page, senders can either type their own message or use AI-assisted suggestions that are generated safely on the server.

## Architecture Highlights

### App Structure

- **Next.js App Router** for UI, routing, and server handlers in one codebase
- **Auth.js** for credentials-based session management
- **MongoDB + Mongoose** for data persistence
- **Route Handlers** for registration, messaging, suggestions, and dashboard APIs

## Tech Stack

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Next.js Route Handlers, Auth.js
- **Database:** MongoDB, Mongoose
- **Validation:** Zod
- **Auth / Security:** Auth.js credentials auth, bcrypt password hashing
- **AI / Infra:** Gemini API, Upstash Redis, Upstash Ratelimit
- **Deployment:** Vercel

## Main Features

- Credentials-based sign up and sign in
- Session-protected dashboard
- Anonymous public messaging via `/u/[username]`
- Accept / reject incoming messages
- Delete message flow with modal confirmation
- AI-generated sendable feedback suggestions
- Server-side fallback suggestions when AI is unavailable
- Responsive UI optimized for desktop and mobile

## Routes

### App Routes

- `/` landing page
- `/sign-in` credentials login
- `/sign-up` registration
- `/dashboard` authenticated user dashboard
- `/u/[username]` public anonymous message page

### API Routes

- `POST /api/auth/register`
- `POST /api/auth/[...nextauth]`
- `GET /api/user/me`
- `PATCH /api/user/accept-messages`
- `DELETE /api/user/messages/[messageId]`
- `POST /api/user/send-message`
- `POST /api/user/suggestions`

## Local Setup

Create `.env.local` from `.env.example` and set:

```bash
MONGODB_URI=your_mongodb_uri
AUTH_SECRET=your_long_random_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
GEMINI_API_KEY=your_google_ai_studio_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

Install and run:

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
```

## Notes

- `legacy-src/` contains the older frontend kept for reference during the rebuild
- `legacy-api/` contains the older Express backend kept for reference
- AI suggestions are server-side only; no API keys are exposed to the client
- If Gemini or the rate-limit layer is unavailable, the app falls back to local suggestions

