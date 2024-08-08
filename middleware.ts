export { auth as middleware } from "@/auth"

// Optionally, don't invoke Middleware on some paths  - APPARENTLY THIS ISN'T THE BEST
// export const config = {
//   // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/dashboard"]
//   matcher: ["/dashboard"]
// }
