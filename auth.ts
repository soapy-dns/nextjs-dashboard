import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
// import { sql } from "@vercel/postgres"
import type { User } from "@/app/lib/definitions"
import bcrypt from "bcrypt"
import { getUserByEmail } from "./app/db/queries"

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // console.log("authorize -credentials", credentials)
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        // console.log("--parsedCredentials--", parsedCredentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUserByEmail(email)
          console.log("--user--", user)
          if (!user) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          //   console.log("--passwordsMatch--", passwordsMatch)

          if (passwordsMatch) {
            console.log("Passwords matched, return user", user)
            return user
          }
        }

        console.log("Invalid credentials...........")
        return null
      }
    })
  ]
})
