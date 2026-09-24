# teawork-be

Express + TypeScript API with Drizzle ORM and PostgreSQL.

## Local setup

1. Copy `.env.example` to `.env.development` and set `DATABASE_URL`, `JWT_ACCESS_SECRET`, and optionally `IPINFO_GEOLOCATION_API_KEY`.
2. Start Postgres (example):

   ```bash
   docker run --name teawork-db \
     -e POSTGRES_USER=teawork \
     -e POSTGRES_PASSWORD=teawork \
     -e POSTGRES_DB=teawork_db \
     -p 5432:5432 -d postgres:16-alpine
   ```

3. Install dependencies: `pnpm install`
4. Apply schema: `pnpm run db-push-dev` (or `pnpm run db-migrate-dev` after `db-generate`)
5. Run dev server: `pnpm run dev`

Protected routes under `/userInfo` expect `Authorization: Bearer <JWT>` signed with `JWT_ACCESS_SECRET`. The JWT payload must include `{ "userId": <users.id> }`.

## Docker

`docker compose up --build` runs the API and a Postgres service on port 3001.
