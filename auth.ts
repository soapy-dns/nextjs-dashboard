import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

const adminUser = { id: "1", email: "neil@neil.com", password: "blahblah" }
export const { handlers, auth, signIn, signOut } = NextAuth({
  // pages: {
  //   signIn: "/login"
  // },
  // TODO: getting Credentials to work with redirects and custom forms with next-auth v5 was beyond me.
  callbacks: {
    // this makes it redirect to the baseUrl otherwise it goes to the favicon!!
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    authorized({ auth, request: { nextUrl } }) {
      // Check if the user is authenticated
      console.log("authorized", auth)
      console.log("--nextUrl--", nextUrl)
      const isLoggedIn = !!auth?.user
      console.log("--isLoggedIn--", isLoggedIn)
      // Initialize protected routes
      // Here, all routes except the login page is protected
      // const isOnProtected = !nextUrl.pathname.startsWith("/login")

      // if (isOnProtected) {
      //   if (isLoggedIn) return true
      //   return false // redirect to /login
      // } else if (isLoggedIn) {
      //   // redirected to homepage
      //   return Response.redirect(new URL("/", nextUrl))
      // }
      return true
    }
  },
  providers: [
    GitHub
    // Credentials({
    //   name: "Credentials",
    //   credentials: {
    //     email: {},
    //     password: {}
    //   },

    //   // only at login time - authenticates (authorize too?)
    //   async authorize(credentials) {
    //     console.log("--credentials--", credentials)
    //     const parsedCredentials = z
    //       .object({ email: z.string().email(), password: z.string().min(6) })
    //       .safeParse(credentials)

    //     if (parsedCredentials.success) {
    //       const { email, password } = parsedCredentials.data
    //       if (email === adminUser.email && password === adminUser.password) {
    //         return adminUser
    //       }
    //       return null
    //     }

    //     return null
    //   }
    // })
  ]
})
