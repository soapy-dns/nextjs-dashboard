import type { NextAuthOptions } from "next-auth"
import bcrypt from "bcrypt"

import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserByEmail } from "@/app/db/queries"

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username:", type: "text", placeceholder: "your-username" },
        password: { label: "Password", type: "password", placeholder: "your-password" }
      },
      async authorize(credentials) {
        if (credentials?.username && credentials?.password) {
          const user = await getUserByEmail(credentials.username)
          if (!user) return null

          const passwordsMatch = await bcrypt.compare(credentials.password, user.password)

          if (passwordsMatch) {
            return user
          }
        }

        return null
      }
    })

    // ---SUPER SIMPLE EXAMPLE---
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username:", type: "text", placeceholder: "your-username" },
    //     password: { label: "Password", type: "password", placeholder: "your-password" }
    //   },
    //   async authorize(credentials) {
    //     // This is where you need to retrieve user data to verify credentials
    //     // Docs: https://next-auth.js.org/configuration/providers/credentials
    //     const user = { id: "42", name: "Neil", password: "nextauth" }

    //     if (credentials?.username === user.name && credentials?.password === user.password) {
    //       return user
    //     }
    //     return null
    //   }
    // })
  ]
}
