import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { myAxios } from "../../../config/axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        let res: any = await myAxios.post('/accounts/login', {
          email: credentials?.email,
          password: credentials?.password
        })

        let user: any = res.data

        if (res.status === 201 && user) {
          return {accessToken:user.access_token,...user.profile}
        } else {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/login',
    // error: '/login', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: "halaqah-system-api",
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      else if (url.startsWith("/")) return baseUrl + '' + url //new URL(url, baseUrl).toString()
      return baseUrl
    },
    async session({ session, user, token }: any) {
      console.log("===session=====");
      console.log({ session, user, token });

      session.accessToken = token.accessToken
      session.user = { ...session.user, ...token.user }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      console.log("===jwt=====");
      console.log({ token, user, account, profile, isNewUser });

      return { ...token, user: { ...token?.user, ...user },  }


    }
  }
})