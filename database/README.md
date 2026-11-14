
# PostgreSQL Database Setup

This directory contains the SQL scripts required to initialize the Vehicle Service Platform database.

## Prerequisites

- PostgreSQL installed and running
- PostgreSQL administrator access
- Node.js and npm

## 1. Create the database

Connect to PostgreSQL as an administrator:

```powershell
psql -U postgres -h localhost -d postgres
```

Run:

```sql
CREATE DATABASE vehicle_service_db;
```

Exit with `\q`.

## 2. Create the application role

Connect to the new database:

```powershell
psql -U postgres -h localhost -d vehicle_service_db
```

Create a restricted application account:

```sql
CREATE ROLE vehicle_app WITH LOGIN PASSWORD 'REPLACE_WITH_A_STRONG_PASSWORD';
```

Choose a unique password. Never commit real credentials to Git.

Exit with `\q`.

## 3. Initialize the database schema

From the project root:

```powershell
psql -U postgres -h localhost -d vehicle_service_db -f database/schema.sql
```

## 4. Grant application permissions

From the project root:

```powershell
psql -U postgres -h localhost -d vehicle_service_db -f database/permissions.sql
```

## 5. Configure environment variables

Create a `.env` file in the project root:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vehicle_service_db
DB_USER=vehicle_app
DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

The `.env` file must remain excluded from Git.

## 6. Install dependencies and start the API

```powershell
npm install
npm run build
npm run dev
```

The Express application should start on its configured port.

## 7. Verify the database connection

```powershell
npx tsx src/testDatabase.ts
```

A successful connection should display the vehicle records currently stored in PostgreSQL.

## Available database scripts

| File | Purpose |
|---|---|
| `schema.sql` | Creates the vehicles table |
| `permissions.sql` | Grants database access to the application role |
