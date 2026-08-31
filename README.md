# Digital Business Card

A full-stack developer portfolio with a public business-card view and a built-in CRUD management mode. Profile, skills, projects, and work experience are stored in PostgreSQL and exposed through a GraphQL API.

## Tech stack

### Backend

- NestJS and TypeScript
- GraphQL with Apollo Server (code-first schema)
- Prisma 7 with the PostgreSQL driver adapter
- PostgreSQL
- Joi and class-validator

### Frontend

- React 19 and TypeScript
- Vite
- Apollo Client
- Plain responsive CSS
- Nginx for the production container

## Features

- Public portfolio with profile photo and contact links
- Profile read and update
- Skills CRUD with categories and duplicate protection
- Projects CRUD with GitHub and demo links
- Experience CRUD with highlights and technology stacks
- Experience date validation on both frontend and backend
- Responsive Edit mode with loading, error, and delete-confirmation states
- Safe atomic demo-data seed
- Docker Compose setup for frontend, backend, and PostgreSQL

## GraphQL API

The API is available at `http://localhost:3000/graphql`.

## Run with Docker

```bash
docker compose up --build
```

Services:

- Frontend: http://localhost:5173
- GraphQL API: http://localhost:3000/graphql
- PostgreSQL: `localhost:5433`

Run in the background:

```bash
docker compose up --build -d
```

Stop containers without deleting database data:

```bash
docker compose down
```

Remove containers and the PostgreSQL volume:

```bash
docker compose down -v
```

After `down -v`, the next startup creates a fresh database and restores the demo data. Host ports and database credentials can be overridden with `FRONTEND_PORT`, `BACKEND_PORT`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `VITE_GRAPHQL_URL`.

## Local development

Requirements:

- Node.js 22+
- npm
- PostgreSQL

### Backend

```bash
cd backend
npm ci
```

Create `backend/.env` from `backend/.env.example` and set the PostgreSQL connection URL:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/digital_business_card
PORT=3000
```

Generate Prisma Client, apply migrations, seed the database, and start NestJS:

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run start:dev
```

The seed is safe to run repeatedly: if a Profile already exists, existing data is preserved. All initial demo records are created in one transaction.

### Frontend

In a second terminal:

```bash
cd frontend
npm ci
```

Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_GRAPHQL_URL=http://localhost:3000/graphql
```

Start Vite:

```bash
npm run dev
```

Open http://localhost:5173.

## Edit mode

Use the **Edit mode** button in the portfolio header to manage data:

- edit Profile and contact fields;
- create, update, and delete Skills;
- create, update, and delete Projects;
- create, update, and delete Experience entries.

https://beautiful-courage-production-c3bd.up.railway.app/graphql
