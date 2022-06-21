/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    "app.name": "test-wine-online",
    GITHUB_ID: "2cecaaa4b98e8e4a2e21",
    GITHUB_SECRET: "ed0161bb34491500df0218c4b2c6fefa0d56d67d",
    TWITTER_CLIENT_ID: "fa4KfBKQVOZMukkhrB4XBEozZ",
    TWITTER_CLIENT_SECRET: "4W7jvxt53P79a2gQhnJ48pYPK1azRB2FUt1rgiao0nqM1TDZUf",
    FACEBOOK_ID: "964951260840970",
    FACEBOOK_SECRET: "981844001295fe7635c01268a20a1e0d",
    GOOGLE_ID:
      "1073526809749-odheiutc39fssjviq66k3mr6pu7e68hg.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
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
 */
