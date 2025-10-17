# Docker Runtime Guide

## 1. Prerequisites

- Docker & Docker Compose installed
- Node.js 22+ (only needed for local development outside containers)
- Git installed

---

## 2. Environment Configuration

All services share a single `.env` file at the project root.

**Tip**: Never commit `.env` to version control.

### Required Variables

| Category          | Variable                     | Description                           |
|-------------------|------------------------------|---------------------------------------|
| **Database Init** | `MONGO_INITDB_ROOT_USERNAME` | Root admin username                   |
|                   | `MONGO_INITDB_ROOT_PASSWORD` | Root admin password                   |
|                   | `MONGO_INITDB_DATABASE`      | Initial DB name (default: `ChariERP`) |
| **App DB User**   | `MONGO_APP_USER`             | Application DB user name              |
|                   | `MONGO_APP_PASSWORD`         | Application DB password               |
| **Connection**    | `MONGO_URI`                  | MongoDB URI for application           |
| **Auth**          | `JWT_SECRET`                 | JWT secret (32+ characters)           |
| **S3 / Spaces**   | `SPACES_KEY`                 | Access key                            |
|                   | `SPACES_SECRET`              | Secret key                            |
|                   | `S3_BUCKET_ID`               | Bucket name/ID                        |
| **Email Service** | `RESEND_API_KEY`             | Email API key                         |
|                   | `EMAIL_FROM`                 | Sender address                        |

Example `.env`:

~~~dotenv
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=secure_password
MONGO_INITDB_DATABASE=ChariERP
MONGO_APP_USER=chaierp_user
MONGO_APP_PASSWORD=secure_app_password
MONGO_URI=mongodb://chaierp_user:secure_app_password@database:27017/ChariERP
JWT_SECRET=very_secure_32plus_char_secret
SPACES_KEY=spaces_key
SPACES_SECRET=spaces_secret
S3_BUCKET_ID=my_bucket
RESEND_API_KEY=resend_api_key
EMAIL_FROM=no-reply@example.com
~~~

---

## 3. Services Overview

The project uses Docker Compose profiles to separate development and production environments:

### Development Profile (`dev`)
| Service    | Base Image     | Type         | Command           | Hot Reload |
|------------|----------------|--------------|-------------------|------------|
| client-dev | node:22-alpine | Volume mount | npm run dev       | ✅ Yes      |
| server-dev | node:22-alpine | Volume mount | npm run start:dev | ✅ Yes      |
| database   | mongo:latest   | Container    | default           | N/A        |

### Production Profile (`prod`)
| Service     | Base Image            | Type              | Build Process | Optimized |
|-------------|-----------------------|-------------------|---------------|-----------|
| client-prod | Built from Dockerfile | Multi-stage build | npm run build | ✅ Yes     |
| server-prod | Built from Dockerfile | Multi-stage build | npm run build | ✅ Yes     |
| database    | mongo:latest          | Container         | default       | N/A       |

**Ports:**
- Frontend → http://localhost:3000
- Backend → http://localhost:8080
- Database → localhost:27017

---

## 4. Running the Application

### Production Mode (Default)
Optimized builds using multi-stage Dockerfiles:
~~~shell
docker compose up -d
# OR
docker compose --profile prod up -d
~~~

### Development Mode
Fast startup with hot reloading and volume mounts:
~~~shell
docker-compose --profile dev up -d
~~~


### Service Management

View logs:
~~~shell
docker compose logs -f  
docker compose logs -f client-dev    # or client-prod
docker compose logs -f server-dev    # or server-prod
docker compose logs -f database
~~~

Stop services (keep volumes):
~~~shell
docker compose down
~~~

Stop services and delete data:
~~~shell
docker compose down -v
~~~

Rebuild production images:
~~~shell
docker compose --profile prod up -d --build
~~~

Check status:
~~~shell
docker compose ps
~~~

---

## 5. Volumes

| Volume              | Purpose                   | Used In    |
|---------------------|---------------------------|------------|
| mongo_data          | MongoDB data persistence  | Both modes |
| client_node_modules | Frontend dependency cache | Dev only   |
| server_node_modules | Backend dependency cache  | Dev only   |

---

## 6. Troubleshooting

#### Ports in use:
- Ensure 3000, 8080, and 27017 are available
- Change port mappings in compose.yaml if needed

#### Environment variables not loading:
- Check `.env` exists at project root
- Verify correct format and syntax
- Restart containers after changes

#### Database connection failed:
- Verify `MONGO_URI` format in `.env`
- Ensure database container is running
- Check logs: `docker compose logs database`

#### Services fail to start:
- Dependencies handled by `depends_on`
- Check status: `docker compose ps`
- View logs: `docker compose logs --tail=200`

#### Reset Database:
~~~shell
docker compose down -v  
docker compose --profile dev up -d  # or --profile prod
~~~

#### MongoDB shell access:

Application user:
~~~shell
docker compose exec database mongosh -u chaierp_user -p your_app_password ChariERP
~~~

Admin access:
~~~shell
docker compose exec database mongosh -u root -p your_secure_password admin
~~~

---

## 7. Development vs Production

| Aspect           | Development Profile        | Production Profile        |
|------------------|----------------------------|---------------------------|
| **Startup Time** | Fast (no build required)   | Slower (builds images)    |
| **File Changes** | Auto-reload                | Rebuild required          |
| **Image Size**   | Larger (includes dev deps) | Optimized (prod only)     |
| **Security**     | Basic                      | Hardened (non-root users) |
| **Performance**  | Good for development       | Optimized for production  |
| **Use Case**     | Local development          | Staging/Production deploy |

---

## 8. Security Best Practices

1. Strong passwords for all DB users
2. JWT secrets should be random & 32+ characters
3. Separate credentials for each environment
4. Rotate secrets regularly in production
5. Never commit `.env` to version control
6. Production images run as non-root users