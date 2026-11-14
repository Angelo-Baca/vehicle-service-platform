# Vehicle Service Platform — Frontend

A dark-themed vehicle inventory dashboard using Vite, vanilla TypeScript, and CSS.

## Local development

1. Start PostgreSQL and the existing Express backend from the repository root: `npm run dev` (port 3000).
2. In a second terminal: `cd frontend`, then `npm install`, then `npm run dev`.
3. Open http://localhost:5173.

Vite proxies `/vehicles` and `/health` to `http://localhost:3000`, avoiding CORS changes for local development.

## Build

Run `npm run build` inside `frontend/`. This produces `frontend/dist/` (do not commit generated build output).

## API contract

`GET /vehicles` returns `{ "message": [ { "id": 1, "make": "Toyota", "model": "Tacoma", "year": 2004 } ] }`.

POST and PUT send `{ "make": string, "model": string, "year": number }`.

DELETE requests `/vehicles/:id`. Frontend actions write to the real database; use test data only.

## Important security note

The existing backend has no authentication and limited request validation. This frontend is intended for **local development only** until the API is secured. Do not publicly deploy write-enabled endpoints without authentication, authorization, server-side validation, and appropriate deployment configuration.

The dashboard's vehicle counts are computed from API records; it does not claim to support service jobs or appointments.
