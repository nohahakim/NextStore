// Header.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Menu from "./menu";
import { getMyCart } from "@/lib/actions/cart.actions";
import CategoriesDrawer from "./categories-drawer";
import Search from "./search";
const Header: React.FC = async () => {
  const cart = await getMyCart();
  return (
    <header
      className="    w-full border-b
        bg-gradient-to-r from-brand-dark to-brand text-white
        py-4 px-6 shadow-md 
        transition-colors
        dark:bg-gradient-to-r dark:from-[#1C1C1C] dark:to-[#323232] dark:text-gray-100"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CategoriesDrawer />
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.svg"
              alt="Nextstore logo"
              width={40}
              height={40}
              className="h-12 w-12 md:h-16 md:w-16"
              priority={true}
            />
            <span className="font-bold text-xl  tracking-tight">Nextstore</span>
          </Link>
        </div>

        <div className=" hidden md:flex relative  mx-8">
          <Search />
        </div>

        <Menu cart={cart} />
      </div>
    </header>
  );
};

export default Header;
