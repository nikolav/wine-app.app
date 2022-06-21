import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";

export default async function handle(req, res) {
  // https://next-auth.js.org/configuration/options
  return await NextAuth(req, res, {
    // provider config options
    // https://next-auth.js.org/configuration/providers/oauth#options
    providers: [
      //
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
      }),
    ],
    // // https://next-auth.js.org/configuration/callbacks
    // // https://next-auth.js.org/getting-started/example#using-nextauthjs-callbacks
    callbacks: {
      session: ({ session, user, token }) => {
        session.user.uid = token.sub;
        return session;
      },
    },
  });
}
