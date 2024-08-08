import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
// import Credentials from "next-auth/providers/credentials"
// import { z } from "zod"

const adminUser = { id: "1", email: "neil@neil.com", password: "blahblah" }
export const { handlers, auth, signIn, signOut } = NextAuth({
  // TODO: getting Credentials to work with redirects and custom forms with next-auth v5 was beyond me.
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
