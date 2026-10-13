import { createServer } from "node:http";

const port = Number(process.env.BACKEND_PORT || 3101);

const server = createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (request.method === "OPTIONS") return response.writeHead(204).end();
  if (request.method === "GET" && request.url === "/api/health") {
    response.writeHead(200, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ ok: true, service: "aws-learning-hub-backend", time: new Date().toISOString() }));
  }
  if (request.method === "GET" && request.url === "/api/info") {
    response.writeHead(200, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ name: "AWS Learning Hub API", version: "0.1.0" }));
  }
  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, () => console.log(`Backend API ready at http://localhost:${port}`));
