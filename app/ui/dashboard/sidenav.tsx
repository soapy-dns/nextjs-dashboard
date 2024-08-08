import Link from "next/link"
import NavLinks from "@/app/ui/dashboard/nav-links"
import AcmeLogo from "@/app/ui/acme-logo"
import { PowerIcon } from "@heroicons/react/24/outline"
import { signOut } from "@/auth"
import { redirect } from "next/dist/server/api-utils"

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40" href="/">
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        {/* as a server component, we can't use events, but we can use a form */}
        <form
          action={async () => {
            "use server"
            console.log("signout")
            await signOut({ redirectTo: "/", redirect: true })
          }}
        >
          <button
            type="submit"
            className="h-[48px]  block w-full rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600  md:p-2 md:px-3"
          >
            <div className="flex items-center justify-start gap-2 md:flex-none md:justify-start grow">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}
