# Docker Runtime Guide

## Prerequisites

- Docker and Docker Compose installed
- Node.js 22 or later
- Git

## Environment Configuration

### Single Environment File

The project uses a single `.env` file in the root directory for all services. This file contains configuration for the database, server, and external services.

Create a `.env` file in the root directory with the following variables:

### Database Configuration

- `MONGO_INITDB_ROOT_USERNAME` - MongoDB root username (for container initialization)
- `MONGO_INITDB_ROOT_PASSWORD` - MongoDB root password (for container initialization)
- `MONGO_INITDB_DATABASE` - Initial database name (default: ChariERP)
- `MONGO_APP_USER` - Application database user (created automatically)
- `MONGO_APP_PASSWORD` - Application database user password
- `MONGO_URI` - Complete MongoDB connection string for the application

### Authentication

- `JWT_SECRET` - JWT secret key (32+ characters required)

### Digital Ocean Spaces (S3)

- `SPACES_KEY` - Digital Ocean Spaces access key
- `SPACES_SECRET` - Digital Ocean Spaces secret key
- `S3_BUCKET_ID` - S3 bucket identifier

### Email Service

- `SEND_GRID_API_KEY` - SendGrid API key
- `EMAIL_FROM` - Sender email address

### Example .env file:

```dotenv
# MongoDB Configuration
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=your_secure_password
MONGO_INITDB_DATABASE=ChariERP

# Application Database User
MONGO_APP_USER=chaierp_user
MONGO_APP_PASSWORD=your_app_password

# Application Connection String
MONGO_URI=mongodb://chaierp_user:your_app_password@database:27017/ChariERP

# Application Configuration
JWT_SECRET=your_super_secret_32+_characters_phrase

# External Services
SPACES_KEY=your_spaces_key
SPACES_SECRET=your_spaces_secret
S3_BUCKET_ID=your-bucket-name

SEND_GRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=your@email.com
```

**Important Notes:**
- The root `.env` file is shared across all containers (database, server)
- The application uses a dedicated database user (`MONGO_APP_USER`) instead of root for better security
- The database initialization script automatically creates the application user and seeds demo data
- Do not commit `.env` file to version control

## Database Setup

### Automatic Initialization

The MongoDB container automatically:

1. **Creates application user**: Using `MONGO_APP_USER` and `MONGO_APP_PASSWORD` from `.env`
2. **Sets up database schema**: Creates collections with proper indexes
3. **Seeds demo data**: Inserts sample organization, user, assets, and tasks
4. **Applies validation rules**: Sets up MongoDB schema validation

### Demo Data

The initialization script creates:
- **Demo Organization**: "Demo Organization"
- **Demo User**:
    - Email: `alice.user@example.com`
    - Password: `Passw0rd!`
    - Role: `user`
- **Sample assets and tasks** for testing

### Database Access

**For Applications:**
- Connection string: Value from `MONGO_URI` environment variable
- User: `chaierp_user` (or value from `MONGO_APP_USER`)
- Database: `ChariERP` (or value from `MONGO_INITDB_DATABASE`)

**For MongoDB Compass:**
```
mongodb://chaierp_user:your_app_password@localhost:27017/ChariERP
```

**For Admin Access (if needed):**
```
mongodb://root:your_secure_password@localhost:27017/admin
```

## Running the Application

### Start All Services

To run all services together:

```bash
docker compose up -d
```

**Services:**
- **Client (frontend)**: http://localhost:3000
- **Server (backend API)**: http://localhost:8080
- **MongoDB**: localhost:27017

### View Logs

View combined logs:
```bash
docker compose logs -f
```

View logs for specific service:
```bash
docker compose logs -f database
docker compose logs -f server
docker compose logs -f client
```

### Stop Services

Stop and remove containers (preserve volumes):
```bash
docker compose down
```

Stop and remove everything including volumes ⚠️ **CAUTION: Deletes all data**:
```bash
docker compose down -v
```

### Rebuild and Restart

When dependencies change or you need fresh containers:
```bash
docker compose up -d --build
```

### Service Management

**Start individual services:**
```bash
docker compose up -d database
docker compose up -d server
docker compose up -d client
```

**Restart specific service:**
```bash
docker compose restart server
```

**Check service status:**
```bash
docker compose ps
```

## Environment-Specific Configurations

### Development vs Production

For different environments, create separate environment files:
- `.env` (development)
- `.env.production`
- `.env.staging`

Update `compose.yaml` or use override files to reference the appropriate environment file.

### Security Best Practices

1. **Use strong passwords** for database users
2. **Generate secure JWT secrets** (32+ characters)
3. **Never commit `.env` files** to version control
4. **Use different credentials** for each environment
5. **Rotate secrets regularly** in production

## Troubleshooting

### Common Issues

**Port conflicts:**
- Ensure ports 3000, 8080, and 27017 are available
- Modify port mappings in `compose.yaml` if needed

**Environment variables not loaded:**
- Verify `.env` file exists in project root
- Check file format and variable names
- Restart containers after changing `.env`

**Database connection failures:**
- Verify `MONGO_URI` format is correct
- Ensure database container is running before server
- Check logs: `docker compose logs database`

**Services fail to start:**
- Check dependency order: database → server → client
- Inspect container status: `docker compose ps`
- View detailed logs: `docker compose logs --tail=200`

### Reset Database

To start with fresh database:
```bash
docker compose down -v
docker compose up -d database
# Wait for database to initialize, then start other services
docker compose up -d
```

### Database Administration

Access MongoDB shell:
```bash
docker compose exec database mongosh -u chaierp_user -p your_app_password ChariERP
```

Access with admin privileges:
```bash
docker compose exec database mongosh -u root -p your_secure_password admin
```
```