import { createServer } from "node:http";

const port = Number(process.env.BACKEND_PORT || 3101);
const json = (response, status, body) => { response.writeHead(status, { "Content-Type": "application/json" }); response.end(JSON.stringify(body)); };
const server = createServer(async (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS"); response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "OPTIONS") return response.writeHead(204).end();
  const url = new URL(request.url || "/", "http://localhost");
  if (request.method === "GET" && url.pathname === "/api/health") return json(response, 200, { ok: true, service: "aws-learning-hub-backend", time: new Date().toISOString() });
  if (request.method === "GET" && url.pathname === "/api/info") return json(response, 200, { name: "AWS Learning Hub API", version: "0.2.0" });
  if (request.method === "GET" && url.pathname === "/api/translate") {
    const text = url.searchParams.get("text")?.trim(); if (!text) return json(response, 400, { error: "Missing text" }); if (text.length > 500) return json(response, 400, { error: "Text is too long" });
    try { const provider = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|vi`); const data = await provider.json(); const translation = data?.responseData?.translatedText; if (!provider.ok || !translation) throw new Error("Translation unavailable"); return json(response, 200, { translation, provider: "MyMemory" }); } catch { return json(response, 502, { error: "Translation service is unavailable. Try again later." }); }
  }
  return json(response, 404, { error: "Not found" });
});
server.listen(port, () => console.log(`Backend API ready at http://localhost:${port}`));
