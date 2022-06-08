/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    "app.name": "test-wine-online",
  },
  images: {
    domains: [
      "firebasestorage.googleapis.com",
    ],
  },
};
module.exports = nextConfig;

/**
 * basePath - To deploy a Next.js application under a sub-path of a domain you can use the basePath config option
 * 
 * // https://nextjs.org/docs/api-reference/next.config.js/rewrites
 * async rewrites() - Rewrites allow you to map an incoming request path to a different destination path.
 * 
 * 
 * 
 */
