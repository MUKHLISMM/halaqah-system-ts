import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LineProvider from "next-auth/providers/line";
import axios from "axios";
// import { fetcher } from '../../../lib/fetchs'
let fetcher= axios
export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers

    providers: [

        CredentialsProvider({
            name: 'ระบบโรงพยาบาลบันนังสตา',
            credentials: {
                userName: { label: "ชื่อผู้ใช้", type: "text", placeholder: "ป้อนชื่อผู้ใช้" },
                password: { label: "รหัสผ่าน", type: "password", placeholder: "ป้อนรหัสผ่าน" }
            },
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                // const user = await res.json()
                const ress = await fetcher.post('/auth/login', JSON.stringify(credentials))
                const user = await ress.data
                // If no error and we have user data, return it
                // console.log(user);
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            },
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID || '',
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        // }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_CLIENT_ID || '',
        //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ''
        // }),
        // LineProvider({
        //     clientId: process.env.LINE_CLIENT_ID || '',
        //     clientSecret: process.env.LINE_CLIENT_SECRET || ''
        // })
        // ...add more providers here
    ],
    secret: "Dev by Masaopis Soowae",
    session: {
        maxAge: 5 * 60 * 60, // 12 hour
        updateAge: 5 * 60 * 60, // 12 hours

    },
    jwt: {
        maxAge: 5 * 60 * 60,
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }: any) {
            if (account.provider !== 'credentials') {
                try {
                    let check = await fetcher.post('/account-provider/login', { provider: account.provider, accountId: user.id })
                    // console.log('res', check.data);
                    return true
                } catch (error: any) {
                    console.log('error', error.response.data);
                    let provide = {
                        ...user,
                        provider: btoa(account.provider),
                        id: btoa(user.id),
                        email: btoa(user.email)
                    }
                    let data = encodeURIComponent(JSON.stringify(provide))
                    return `/register?data=${data}`
                    // return true
                }
            }
            return true
        },
        async redirect({ url, baseUrl }: any) {
            if (url.startsWith(baseUrl)) return url
            else if (url.startsWith("/")) return baseUrl + '' + url //new URL(url, baseUrl).toString()
            return baseUrl
        },
        async session({ session, user, token }: any) {

            session.accessToken = token.accessToken
            session.user = { ...session.user, ...token.user }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }: any) {
            if (account) {
                if (account.provider === 'credentials') {
                    token.user = {
                        providers: account.provider,
                        ...user,
                        id: user.id,
                        fullName: user.fullName,
                        department: user.department,
                        position: user.position,
                        access: user.access,
                    }
                    token.accessToken = user.accessToken
                } else {
                    try {
                        let res = await fetcher.post('/account-provider/login', { provider: account.provider, accountId: user.id })
                        let users = res.data
                        token.user = {
                            ...users,
                            ...user,
                            id: users.id,
                            fullName: users.fullName,
                            department: users.department,
                            dpmId: users.department.id,
                            position: users.position,
                            access: users.access,
                            isAdmin: users.isAdmin,
                            account
                        }
                        token.accessToken = users.accessToken
                    } catch (error:any) {
                        console.log('error', error.response.data);
                    }
                }
            }
            console.log('====================================');
            console.log(token);
            console.log('====================================');
            return token
        }

    },
    pages: {
        signIn: '/login',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "", // Hex color value
        logo: "/img/logo.png" // Absolute URL to logo image
    }
}
export default NextAuth(authOptions)