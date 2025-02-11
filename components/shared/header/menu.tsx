import Link from "next/link";
import {
  FaBars,
  FaChevronDown,
  FaSearch,
  FaSun,
  FaShoppingCart,
  FaUser,
  FaEllipsisV,
} from "react-icons/fa";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ModeToggle from "./mode-toggle";
import { FaEllipsisVertical } from "react-icons/fa6";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex items-center space-x-3">
        <ModeToggle />

        <Link
          href="/cart"
          className="hidden md:flex items-center p-3 rounded-full bg-white/10 hover:bg-white/20 transition relative"
        >
          <FaShoppingCart className="text-lg" />
          <span className="absolute -top-1 -right-1 bg-accent text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </Link>

        <Link
          href="/sign-in"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-brand-dark hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          <FaUser className="h-5 w-5" />
          Sign In
        </Link>

        <div className="relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded="false"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-brand-dark hover:bg-accent hover:text-white transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            id="user-profile-button"
          >
            S
          </button>
          <div
            id="user-profile-menu"
            className="absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-md hidden z-30"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-profile-button"
          >
            <div className="px-4 py-3 text-sm text-gray-700 border-b">
              <div className="flex flex-col space-y-1">
                <div className="text-sm font-medium leading-none">Sara</div>
                <div className="text-sm text-gray-400 leading-none">
                  sara@gmail.com
                </div>
              </div>
            </div>
            <div className="py-1">
              <Link
                href="/user/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-white"
                role="menuitem"
              >
                User Profile
              </Link>
              <Link
                href="/user/orders"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-white"
                role="menuitem"
              >
                Order History
              </Link>
              <form action="/sign-out" method="POST" className="mt-1">
                <button
                  type="submit"
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-white"
                  role="menuitem"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <FaEllipsisV className="text-xl" />
          </SheetTrigger>
          <SheetContent className="bg-white dark:bg-gray-900 flex flex-col items-start">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <ModeToggle />
            <Link
              href="/cart"
              className="flex items-center p-3 rounded-full bg-white/10 hover:bg-white/20 transition relative"
            >
              <FaShoppingCart className="text-lg" />
              <span className="absolute -top-1 -right-1 bg-accent text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-brand-dark hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <FaUser className="h-5 w-5" />
              Sign In
            </Link>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
