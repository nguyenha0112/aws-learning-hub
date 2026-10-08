import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import path from "path";

// Keep the real .env at the repository root (outside frontend). Only the
// Supabase URL and publishable key are exposed to the browser; the secret key
// is never included in this configuration.
// Next has already attempted to load frontend/.env before this config runs.
// Force a second load from the repository root, where this project keeps its
// local credentials.
loadEnvConfig(path.resolve(process.cwd(), ".."), process.env.NODE_ENV !== "production", console, true);

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY,
  },
};

export default nextConfig;
