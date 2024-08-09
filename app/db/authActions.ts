// src/lib/actions.ts
"use server"

import { AuthError } from "@auth/core/errors"
import { signIn } from "../../auth"

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      return "log in failed"
    }
    throw error
  }
}
