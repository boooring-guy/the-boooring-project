# 🚀 The Boooring Project: Express Backend

A robust, production-ready Todo application backend built with modern technologies. This is the core API service for The Boooring Project ecosystem.

---

## ✨ Features

- **🔐 Secure Authentication**: Powered by [Lucia Auth](https://lucia-auth.com/) and Argon2 hashing.
- **📝 Todo Management**: Full CRUD operations with status tracking.
- **📂 Image Uploads**: Integrated [Multer](https://github.com/expressjs/multer) for handling file attachments.
- **🏗️ Database Schema**: Type-safe schema management with [Drizzle ORM](https://orm.drizzle.team/).
- **🐳 Dockerized**: Easy deployment and development environment setup with Docker Compose.
- **⚡ Bun Runtime**: Blazing fast performance using the Bun runtime.
- **🪵 Advanced Logging**: Request logging with custom middleware and Chalk styling.

---

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh) (Recommended)
- **Framework**: [Express.js](https://expressjs.com)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Authentication**: [Lucia Auth](https://lucia-auth.com)
- **Password Hashing**: [Argon2](https://github.com/ranisalt/node-argon2)
- **File Handling**: [Multer](https://github.com/expressjs/multer), [Cloudinary](https://cloudinary.com/), [Ali-OSS](https://www.alibabacloud.com/product/oss)
- **Utilities**: [Chalk](https://github.com/chalk/chalk), [Nanoid](https://github.com/ai/nanoid)

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed locally (Recommended) or [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com) (For PostgreSQL)

### Setup

1. **Navigate to the directory**

   ```bash
   cd backend/express
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file based on `.env.example`.

   ```bash
   cp .env.example .env
   ```

4. **Database Migration**

   ```bash
   bun db:push
   ```

5. **Start Development Server**

   ```bash
   bun dev
   ```

---

## 🔌 API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint    | Description               | Auth Required |
| :----- | :---------- | :------------------------ | :------------ |
| POST   | `/login`    | User login                | ❌            |
| POST   | `/register` | User registration         | ❌            |
| POST   | `/logout`   | User logout               | ✅            |
| GET    | `/whoami`   | Get current user info     | ✅            |
| GET    | `/health`   | Auth service health check | ❌            |

### Todo Routes (`/api/todos`)

| Method | Endpoint              | Description                    | Auth Required |
| :----- | :-------------------- | :----------------------------- | :------------ |
| GET    | `/all`                | Fetch all todos                | ✅            |
| POST   | `/new`                | Create a new todo (with image) | ✅            |
| PUT    | `/status/:id/:status` | Update todo status             | ✅            |
| PATCH  | `/:id`                | Update todo details            | ✅            |
| DELETE | `/:id`                | Delete a todo                  | ✅            |

---

## 🐳 Docker Deployment

The project includes a `docker-compose.yml` for easy setup of the backend and database.

```bash
docker compose up --build
```

---

## 📜 Available Scripts

- `bun dev`: Run server in watch mode.
- `bun start`: Run production server.
- `bun db:push`: Push local schema changes to DB.
- `bun db:generate`: Generate SQL migrations.
- `bun db:migrate`: Run SQL migrations.
- `bun db:studio`: Launch Drizzle Studio for DB management.
