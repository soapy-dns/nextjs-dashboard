// import NextAuth from "next-auth"
// import { authConfig } from "./auth.config"

export { default } from "next-auth/middleware"

// export default NextAuth(authConfig).auth

// if I comment this out, then cannot optimize images
// there must be a way to have a whitelist rather than a blacklist
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/dashboard"]
}
// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
// }
