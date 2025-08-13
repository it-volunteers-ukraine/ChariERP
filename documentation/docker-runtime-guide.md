# Runtime Guide

## Prerequisites

- Docker and Docker Compose installed
- Node.js 22 or later
- Git

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Database Configuration

- `MONGO_INITDB_ROOT_USERNAME` - MongoDB root username
- `MONGO_INITDB_ROOT_PASSWORD` - MongoDB root password
- `MONGO_URI` - MongoDB connection string

### Authentication

- `JWT_SECRET` - JWT secret key (32+ characters)

### Digital Ocean Spaces (S3)

- `SPACES_KEY` - Digital Ocean Spaces access key
- `SPACES_SECRET` - Digital Ocean Spaces secret key
- `S3_BUCKET_ID` - S3 bucket identifier

### Email Service

- `SEND_GRID_API_KEY` - SendGrid API key
- `EMAIL_FROM` - Sender email address

Note:

- Docker Compose will automatically load environment variables from the root `.env` file.
- Do not commit `.env` to version control.

## Running the Application

### Start All Services (Docker Compose)

To run all services together in the background:

```shell
bash docker compose up -d
```

- Client (frontend): http://localhost:3000
- Server (backend API): http://localhost:8080
- MongoDB: localhost:27017

View combined logs:

```shell
bash docker compose logs -f
```

Stop and remove all containers (preserve named volumes):

```shell
docker compose down
```

Stop, remove, and delete named volumes (CAUTION: removes database data and node_modules volumes):

```shell
bash docker compose down -v
```

Rebuild images and restart (use when dependencies change):

```shell
bash docker compose up -d --build
```

List running services:

```shell
docker compose ps
```

### Run Services Individually

You can start each service on its own. When starting the server or client, make sure the database is running first.

- Start only the database:

```shell
docker compose up -d database
```

- Start only the server (ensure the database is up):

```shell
docker compose up -d server
```

- Start only the client (ensure the database and server are up if the client depends on them):

```shell
docker compose up -d client
```

View logs for a specific service:

```shell
docker compose logs -f database 
docker compose logs -f server 
docker compose logs -f client
```

Restart a specific service after changes:

```shell
docker compose restart server
```

### Troubleshooting

- Ports already in use: ensure 3000, 8080, and 27017 are free or adjust mappings as needed.
- Environment variables not applied: confirm `.env` exists in the project root and variables are correctly set.
- Services failing to start due to dependencies: start `database` first, then `server`, then `client`.
- Inspect container status:

```shell
docker compose ps docker compose logs --tail=200
```
