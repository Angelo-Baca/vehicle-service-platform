# Vehicle Service Platform

A backend REST API built with TypeScript, Node.js, and Express for managing vehicle service data.

This project is being developed as a portfolio application to demonstrate backend software engineering concepts including RESTful API design, layered architecture, type-safe development, CRUD operations, validation, persistence, authentication, testing, security, and performance optimization.

## Current Status

The project currently provides a working Express API with vehicle CRUD operations backed by temporary in-memory storage.

Implemented functionality includes:

* TypeScript-based Node.js application
* Express server and modular application structure
* Health-check endpoint
* Dedicated vehicle router
* Controller and service layers
* Create, read, update, and delete vehicle operations
* Route parameter handling
* JSON request-body parsing
* HTTP status handling for successful, invalid, and missing requests
* TypeScript compilation and development watch workflow

Vehicle data is currently stored in memory and resets whenever the server restarts. Persistent database storage is planned for a later development phase.

## Architecture

The current application follows a layered structure:

```text
HTTP Request
     |
     v
Express Application
     |
     v
Router
     |
     v
Controller
     |
     v
Service
     |
     v
In-Memory Data
```

Each layer has a separate responsibility:

* **Application** — configures Express and mounts API routes.
* **Router** — maps HTTP methods and paths to controller functions.
* **Controller** — handles HTTP requests, responses, status codes, and request data.
* **Service** — contains vehicle-related application logic and data operations.
* **Data layer** — currently an in-memory vehicle collection; persistent storage will replace this in a later phase.

## API Endpoints

### General

| Method | Endpoint  | Description                        |
| ------ | --------- | ---------------------------------- |
| GET    | `/`       | Confirms that the API is running   |
| GET    | `/health` | Returns service health information |

### Vehicles

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/vehicles`     | Retrieve all vehicles      |
| GET    | `/vehicles/:id` | Retrieve a vehicle by ID   |
| POST   | `/vehicles`     | Create a vehicle           |
| PUT    | `/vehicles/:id` | Update an existing vehicle |
| DELETE | `/vehicles/:id` | Delete an existing vehicle |

## Example Vehicle

```json
{
  "id": 1,
  "make": "Toyota",
  "model": "Tacoma",
  "year": 2004
}
```

## Example Request

Create a vehicle:

```http
POST /vehicles
Content-Type: application/json
```

```json
{
  "make": "Ford",
  "model": "Mustang",
  "year": 2025
}
```

Example successful response:

```json
{
  "id": 3,
  "make": "Ford",
  "model": "Mustang",
  "year": 2025
}
```

## HTTP Responses

The API currently uses HTTP status codes including:

* `200 OK` — successful retrieval, update, or deletion
* `201 Created` — vehicle successfully created
* `400 Bad Request` — invalid vehicle ID
* `404 Not Found` — requested vehicle does not exist

Additional request validation will be added as the project develops.

## Project Structure

```text
vehicle-service-platform/
|
|-- src/
|   |-- controllers/
|   |   `-- vehicleController.ts
|   |
|   |-- routes/
|   |   |-- healthRoutes.ts
|   |   `-- vehicleRoutes.ts
|   |
|   |-- services/
|   |   `-- vehicleService.ts
|   |
|   |-- app.ts
|   `-- server.ts
|
|-- package.json
|-- package-lock.json
|-- tsconfig.json
`-- README.md
```

## Running the Project Locally

### Requirements

* Node.js
* npm

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The API runs locally on:

```text
http://localhost:3000
```

### Production Build

Compile the TypeScript project:

```bash
npm run build
```

Run the compiled application:

```bash
npm start
```

## Technology

* TypeScript
* Node.js
* Express
* npm
* Git

## Development Roadmap

The current in-memory CRUD implementation establishes the API architecture that later phases will build upon.

Planned development includes:

* Persistent database integration
* Repository/data-access layer
* Vehicle and service-record relationships
* Request validation
* Environment-based configuration
* Authentication and authorization
* Secure password handling
* Automated unit and integration testing
* Structured error handling
* Logging and request tracing
* Query-performance profiling and optimization
* API documentation
* CI workflow

## Purpose

Vehicle Service Platform is being developed as a progressively enhanced backend engineering project. Rather than implementing all infrastructure at once, each development phase introduces additional production-oriented concerns while preserving and improving the existing API.

The project is intended to demonstrate both a working application and the engineering process of evolving a small REST API toward a more secure, testable, maintainable, and production-oriented service.
