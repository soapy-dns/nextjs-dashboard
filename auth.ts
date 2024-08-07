import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

const adminUser = { id: "1", username: "neil@neil.com", password: "blahblah" }
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user
  //     const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
  //     if (isOnDashboard) {
  //       if (isLoggedIn) return true
  //       return false // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       return Response.redirect(new URL("/dashboard", nextUrl))
  //     }
  //     return true
  //   }
  // },
  providers: [
    GitHub,
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username:", type: "text", placeceholder: "your-username" },
        password: { label: "Password", type: "password", placeholder: "your-password" }
      },
      async authorize(credentials) {
        console.log("--credentials--", credentials)
        return adminUser
        if (credentials?.username === adminUser.username && credentials?.password === adminUser.password) {
          return adminUser
        }

        return null
      }
    })
  ]
})
