// export { GET, POST } from "@/auth"
// export const runtime = "edge"
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
