import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { redirect } from "next/navigation"

const adminUser = { id: "1", email: "neil@neil.com", password: "blahblah", role: "admin" }
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login" // custom login page - default is api/auth/signin
  },
  // TODO: getting Credentials to work with redirects and custom forms with next-auth v5 was beyond me.
  callbacks: {
    // this makes it redirect to the baseUrl otherwise it goes to the favicon!!
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`
    },
    authorized({ auth, request: { nextUrl } }) {
      // Check if the user is authenticated
      // console.log("authorized", auth)
      // console.log("--nextUrl--", nextUrl)

      const user = auth?.user

      const isLoggedIn = !!auth?.user

      if (user?.role === "admin") {
        console.log("admin user found")
        return true
      }

      return true

      // TODO: get this authorisation stuff to work
      // console.log("--isLoggedIn--", isLoggedIn)
      // Initialize protected routes
      // Here, all routes except the login page is protected
      const isProtected = !nextUrl.pathname.startsWith("/login")

      // console.log("--isProtected--", isProtected)

      // if (isProtected && !isLoggedIn) {
      //   return redirect("/login")
      // }

      if (isProtected) {
        if (isLoggedIn) return true
        return false // redirect to /login
      } else if (isLoggedIn) {
        // redirected to homepage
        return Response.redirect(new URL("/", nextUrl))
      }
      return true
    },
    // for server
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    // for client
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role
      return session
    }
  },
  providers: [
    // GitHub
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },

      // only at login time - authenticates (authorize too?)
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          if (email === adminUser.email && password === adminUser.password) {
            return adminUser
          }
          return null
        }

        return null
      }
    })
  ]
})
