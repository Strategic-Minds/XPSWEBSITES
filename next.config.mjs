import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url))
  }
};

export default nextConfig;

// auth-deploy-trigger: 2026-06-25
