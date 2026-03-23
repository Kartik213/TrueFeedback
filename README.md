# True Feedback

This repository now targets a **Next.js App Router** architecture with **Auth.js credentials auth**, **MongoDB**, and **Mongoose**.

## Stack

- Next.js App Router
- TypeScript
- Auth.js with credentials-based sign-in
- MongoDB + Mongoose
- Tailwind CSS

## Environment

Create `.env.local` from `.env.example` and set:

```bash
MONGODB_URI=your_mongodb_uri
AUTH_SECRET=your_long_random_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Development

```bash
npm install
npm run dev
```

## Main Routes

- `/` landing page
- `/sign-in` credentials login
- `/sign-up` registration
- `/dashboard` authenticated user dashboard
- `/u/[username]` public anonymous message page

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/[...nextauth]`
- `GET /api/user/me`
- `PATCH /api/user/accept-messages`
- `DELETE /api/user/messages/[messageId]`
- `POST /api/user/send-message`
- `GET /api/user/suggestions`

## Notes

- The legacy frontend now lives in `legacy-src/`, and the old Express backend remains in `api/` for reference during migration.
- The new app no longer uses `localStorage` access tokens or the old custom refresh-token flow.
