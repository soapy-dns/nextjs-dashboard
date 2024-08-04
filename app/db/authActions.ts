"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

// export async function authenticate(prevState: string | undefined, formData: FormData) { // with useActionState

// export async function authenticate(prevState: string | undefined, formData: FormData) {
export async function authenticate(formData: FormData) {
  console.log("authenticate action")
  let responseRedirectUrl = null
  try {
    console.log("formData", formData)
    console.log("--Object.fromEntries(formData)--", Object.fromEntries(formData))
    const formDataObj = Object.fromEntries(formData)

    console.log("--formDataObj--", formDataObj)
    responseRedirectUrl = await signIn("credentials", {
      // formData,
      ...formDataObj,
      // ...Object.fromEntries(formData),
      redirect: true
    })
  } catch (error) {
    console.log("error", error)
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin"
    }
    throw error
  } finally {
    console.log("--finally responseRedirectUrl--", responseRedirectUrl)
    if (responseRedirectUrl) redirect(responseRedirectUrl)
  }
}
// export async function authenticate(formData: FormData) {
//   try {
//     console.log("--trying to signIn", formData)
//     const x = await signIn("credentials", formData)
//     console.log("--x---------", x)
//   } catch (error) {
//     console.log("--error--", error)
//     if (error instanceof AuthError) {
//       console.log("Auth error")
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials."
//         default:
//           return "Something went wrong."
//       }
//     }
//     throw error
//   }
// }
