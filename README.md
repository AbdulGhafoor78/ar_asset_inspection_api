# AR Asset Inspection & Maintenance Platform — Backend API

A RESTful backend API for the Enterprise Augmented Reality (AR) Asset Inspection and Maintenance Platform.

This backend provides asset management functionality using Node.js, Express.js, Prisma ORM, and Microsoft SQL Server.

## Technologies Used

- Node.js
- Express.js
- Prisma ORM
- Microsoft SQL Server
- JavaScript
- REST API
- CORS

## Features

- RESTful API architecture
- Asset retrieval and management
- Create, read, update, and delete (CRUD) operations
- SQL Server database integration
- Prisma ORM for database access
- Environment-based database configuration
- API health-check endpoint

## Project Structure

```text
ar_asset_inspection_api/
|-- prisma/
|   |-- migrations/
|   |-- schema.prisma
|-- .env.example
|-- .gitignore
|-- package.json
|-- package-lock.json
|-- prisma.config.ts
|-- server.js
|-- README.md
```

## Prerequisites

Before running the backend, install:

- Node.js and npm
- Microsoft SQL Server
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/AbdulGhafoor78/ar_asset_inspection_api.git
cd ar_asset_inspection_api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root using `.env.example` as a template.

Configure your SQL Server connection string:

```env
DATABASE_URL="sqlserver://YOUR_SERVER:1433;database=YOUR_DATABASE;user=YOUR_USERNAME;password=YOUR_PASSWORD;encrypt=true;trustServerCertificate=true"
```

Replace the placeholders with your own database connection details.

**Security:** Never commit your `.env` file or database credentials to GitHub.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Apply database migrations

```bash
npx prisma migrate deploy
```

Run migrations against your configured database. If the database has already been migrated, no additional migration may be necessary.

### 6. Start the backend server

```bash
npm start
```

The API runs on:

```text
http://localhost:3000
```

The default port is 3000. A custom port can be configured using the `PORT` environment variable.

## API Endpoints

Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check API health |
| GET | `/assets` | Retrieve all assets |
| GET | `/assets/:id` | Retrieve an asset by ID |
| POST | `/assets` | Create a new asset |
| PUT | `/assets/:id` | Update an existing asset |
| DELETE | `/assets/:id` | Delete an asset |

## Health Check

Send a GET request to:

```text
http://localhost:3000/api/health
```

A successful response confirms that the backend is running.

## Database

The application uses Microsoft SQL Server with Prisma ORM.

Database schema and migration history are maintained in the `prisma/` directory.

## Related Project

**Frontend:** Enterprise AR Asset Inspection & Maintenance Platform — Flutter application.

## Developer

**Abdul Ghafoor**

- GitHub: [AbdulGhafoor78](https://github.com/AbdulGhafoor78)
- LinkedIn: [Abdul Ghafoor](https://www.linkedin.com/in/abdul-ghafoor-uiux-flutter)

## License

This project is developed as an individual software engineering internship project.