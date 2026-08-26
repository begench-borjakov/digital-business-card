# Digital Business Card

Portfolio application built with NestJS, GraphQL, Prisma, PostgreSQL, React and Apollo Client.

## Run with Docker

Docker Desktop must be running. From the project root, start the complete application:

```bash
docker compose up --build
```

The services will be available at:

- Frontend: http://localhost:5173
- GraphQL API: http://localhost:3000/graphql
- PostgreSQL: localhost:5433

On the first start, the backend applies Prisma migrations and seeds an empty database. Existing profile data is preserved on subsequent container restarts.

Run in the background:

```bash
docker compose up --build -d
```

Stop the application:

```bash
docker compose down
```

To also remove the PostgreSQL Docker volume and all data stored in it:

```bash
docker compose down -v
```

Ports and database credentials can be overridden with environment variables such as `FRONTEND_PORT`, `BACKEND_PORT`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD`.
