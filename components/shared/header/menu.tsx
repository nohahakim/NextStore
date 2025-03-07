import Link from "next/link";
import { FaShoppingCart, FaEllipsisV } from "react-icons/fa";
import UserButton from "./user-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ModeToggle from "./mode-toggle";

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
        <UserButton />
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
            <UserButton />
            {/* <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-brand-dark hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <FaUser className="h-5 w-5" />
              Sign In
            </Link> */}
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
