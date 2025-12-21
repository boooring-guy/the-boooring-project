# 🥱 The Boooring Project: Project Rules

To maintain consistency and high quality across the entire ecosystem, all sub-projects must adhere to these standards.

## 📁 Directory & Naming Conventions

### 1. Categorization

Projects must be grouped by their role in the ecosystem:

- `/backend`: Core APIs and services.
- `/web`: Web applications (Next.js, Vite, etc.).
- `/native`: Mobile or cross-platform native apps (React Native, Expo, etc.).

### 2. Implementation Naming

Sub-directories must be named using the primary stack/framework used:

- **Good**: `backend/express`, `web/nextjs`, `native/expo`
- **Bad**: `backend/api`, `web/frontend`, `native/mobile`

---

## 🛠️ Tooling & Standards

### 1. Runtime & Package Management

- **[Bun](https://bun.sh)** is the **strongly recommended** runtime and package manager for JS/TS projects due to its speed.
- Other runtimes (Node.js, Deno) are acceptable, but consistent package management within each project is required.

### 2. Containerization

- **Docker** is highly recommended for running local dependencies (PostgreSQL, Redis, etc.).
- Each project should include a `docker-compose.yml` if it requires external services.

---

## 📝 Documentation & Configuration

### 1. ReadMe Requirements

Every sub-project must have its own `README.md` containing:

- A clear description of the component.
- The **Full Tech Stack** used.
- Setup and execution instructions.

### 2. Environment Variables

- Every project requiring configuration must include a `.env.example` file.
- **Security**: `.env.example` must be tracked in git, but must **never** contain real secrets/keys.
- **Reference**: It should serve as a complete reference for all necessary keys (e.g., `DATABASE_URL=`, `PORT=9000`).

---

## 🚀 Collaborative Principles

### 1. Core Concept: The "Todo" Foundation

- **The Baseline**: Every project implementation must, at its core, revolve around the concept of a **Todo application**.
- **Sky is the Limit**: While the baseline is simple, developers are encouraged to add as much complexity as they like. Feel free to integrate **AI features**, advanced state management, unique UI/UX patterns, or experimental tech.
- **Why Todo?**: It serves as the perfect "Hello World" to compare how different platforms and languages handle basic CRUD, state, and data flow.

### 2. Integrity & Evolution

- Keep code clean, type-safe, and follow the established folder structures.
- All projects should stem from or contribute to the core concept defined in the root `README.md`.
- Feel free to propose new rules or optimizations as the Cosmos expands!
