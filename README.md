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

## Architecture

Backend modules follow the same layered flow:

```text
GraphQL Input
    -> Resolver
    -> Service
    -> Repository
    -> Prisma
    -> PostgreSQL
```

Repositories map Prisma models to internal entities. Resolvers map entities to GraphQL response types (RTOs), so Prisma models do not leak through the API boundary.

The frontend keeps GraphQL operations, TypeScript types, forms, and presentation sections in separate files. Apollo Client is the only client-side data layer; mutations refetch the affected query without reloading the page.

## GraphQL API

The API is available at `http://localhost:3000/graphql`.

### Queries

| Query | Description |
| --- | --- |
| `health` | Check API availability |
| `profile` | Get the portfolio profile |
| `skills` | Get all skills |
| `skill(id)` | Get one skill |
| `projects` | Get all projects |
| `project(id)` | Get one project |
| `experiences` | Get all experience entries |
| `experience(id)` | Get one experience entry |

### Mutations

| Mutation | Description |
| --- | --- |
| `updateProfile` | Update profile and contact fields |
| `createSkill`, `updateSkill`, `deleteSkill` | Manage skills |
| `createProject`, `updateProject`, `deleteProject` | Manage projects |
| `createExperience`, `updateExperience`, `deleteExperience` | Manage experience |

## Run with Docker

Docker Desktop must be running. From the project root:

```bash
docker compose up --build
```

Services:

- Frontend: http://localhost:5173
- GraphQL API: http://localhost:3000/graphql
- PostgreSQL: `localhost:5433`

The backend waits for PostgreSQL, applies committed Prisma migrations, safely seeds an empty database, and then starts NestJS. Existing profile and CRUD data are preserved by the named PostgreSQL volume and are not overwritten on restart.

Run in the background:

```bash
docker compose up --build -d
```

Inspect service status and logs:

```bash
docker compose ps
docker compose logs -f
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

Edit mode is intentionally unauthenticated for this local take-home demonstration. It must be protected before deploying the application as a public editable service.

## Validation and persistence

- Global NestJS validation strips unknown fields and rejects non-whitelisted input.
- Optional profile fields support `undefined` (leave unchanged) and `null` (clear value).
- Experience end dates must be later than start dates.
- Current positions must have an empty end date.
- Skill names are unique within a Profile.
- Apollo refetches the affected query after each successful mutation.
- PostgreSQL data survives browser refreshes, backend restarts, and `docker compose down` as long as the named volume is retained.

## Useful commands

Backend:

```bash
npm run lint
npm run build
npm test
```

Frontend:

```bash
npm run lint
npm run build
```

The current repository focuses on application structure and CRUD behaviour; automated tests are not included yet.

## Design decisions

- Profile is treated as a single portfolio record, so the API exposes read/update but no profile creation mutation.
- Spoken languages remain typed static frontend content; technical skills come from GraphQL.
- Prisma Client is generated inside `backend/src/generated/prisma` and compiled into `dist` with the NestJS application.
- Docker uses `localhost:3000/graphql` for Apollo because GraphQL requests are made by the user's browser, not by the frontend container.
- Project technologies are stored as a comma-separated display value, while Experience highlights and technologies use PostgreSQL arrays.
