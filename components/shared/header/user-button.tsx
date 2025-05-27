import Link from "next/link";
import { auth } from "@/auth";
import { FaUser } from "react-icons/fa";
import { signOutUser } from "@/lib/actions/user.actions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserButton = async () => {
  const session = await auth();
  if (!session)
    return (
      <Link
        href="/api/auth/signin"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-brand-dark hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        <FaUser className="h-5 w-5" />
        Sign In
      </Link>
    );

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "";

  return (
    <div className="flex gap-2 items-center ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-brand-dark hover:bg-accent hover:text-white transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              id="user-profile-button"
            >
              {firstInitial}
            </button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/user/profile" className="w-full">
              User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/user/orders" className="w-full">
              Order History
            </Link>
          </DropdownMenuItem>
          {session?.user?.role === "admin" && (
            <DropdownMenuItem>
              <Link href="/admin/overview" className="w-full">
                Admin
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="p-0 mb-1">
            <form className="w-full">
              <button
                onClick={signOutUser}
                type="submit"
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-white"
                role="menuitem"
              >
                Sign Out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
