# Fullstack Project (Spring Boot + Frontend)

This repo was generated on 2025-10-03T08:46:29.

## Structure
```
fullstack-springboot-frontend/
├── backend/        # Spring Boot (Maven, Java 17)
└── frontend/       # Your existing frontend moved here
```

## Backend (Spring Boot)
- Java 17, Spring Boot 3.3, Maven
- Runs on http://localhost:8080
- Sample API: GET /api/messages, POST /api/messages ({"content":"..."}), DELETE /api/messages/{id}

### Run backend
```bash
cd backend
./mvnw spring-boot:run   # if wrapper jars not present, uses local mvn
```

## Frontend
Your original frontend has been placed in `frontend/`.

If you already have a build system (Vite/React/Angular/etc.), continue to use it.
If not, a minimal package.json with Vite scripts is present.

### Run frontend (example with Vite)
```bash
cd frontend
npm install
npm run dev   # dev server at http://localhost:5173
```

## Connect Frontend to Backend
Example fetch from frontend:
```js
async function loadMessages() {
  const res = await fetch("http://localhost:8080/api/messages");
  return await res.json();
}

async function createMessage(content) {
  const res = await fetch("http://localhost:8080/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  });
  return await res.json();
}
```
> If your frontend runs on a different port, update @CrossOrigin and CorsConfig in the backend accordingly.

## Building for Production
- Build frontend (e.g., `npm run build`) and serve the static files with Nginx or your preferred host.
- Alternatively, you can copy the built `frontend/dist` into the backend's `src/main/resources/static` to have Spring Boot serve the assets.
