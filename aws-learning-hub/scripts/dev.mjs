import { spawn } from "node:child_process";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const services = [
  { name: "frontend", args: ["run", "dev", "--prefix", "frontend"] },
  { name: "backend", args: ["run", "dev", "--prefix", "backend"] },
];
const children = services.map(({ name, args }) => {
  const child = spawn(npm, args, { stdio: "inherit", shell: false });
  child.on("exit", (code) => {
    if (code && code !== 0) console.error(`[${name}] stopped with code ${code}`);
  });
  return child;
});

function stopAll(signal) {
  for (const child of children) child.kill(signal);
  process.exit(0);
}

process.on("SIGINT", () => stopAll("SIGINT"));
process.on("SIGTERM", () => stopAll("SIGTERM"));
