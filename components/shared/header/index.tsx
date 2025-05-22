// Header.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaChevronDown, FaSearch } from "react-icons/fa";
import Menu from "./menu";

const Header: React.FC = () => {
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
          {/* Mobile menu button */}
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            className="inline-flex items-center justify-center gap-2 rounded-md p-2 text-white hover:bg-brand-dark/50 transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent"
            id="menu-button"
          >
            <FaBars className="h-6 w-6" />
          </button>
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
        {/* Search bar (desktop) */}
        <div className=" hidden md:flex relative  mx-8">
          <form
            action="/search"
            method="GET"
            className="flex items-center  space-x-2"
          >
            {/* Category dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded="false"
                className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:border-accent transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                id="category-button"
              >
                <span id="selected-category">All</span>
                <FaChevronDown className="ml-2 opacity-70 h-4 w-4" />
              </button>
              <div
                id="category-dropdown"
                className="absolute left-0 mt-1 w-48 rounded-md bg-white border border-gray-200 shadow-lg hidden z-30"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="category-button"
              >
                <Link
                  href="/search?category=All"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-white"
                  role="menuitem"
                  data-category="All"
                >
                  All
                </Link>
                <Link
                  href="/search?category=Mens%20Dress%20Shirts"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-white"
                  role="menuitem"
                  data-category="MensDressShirts"
                >
                  Mens Dress Shirts
                </Link>
                <Link
                  href="/search?category=Womens%20Blouses"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-white"
                  role="menuitem"
                  data-category="WomensBlouses"
                >
                  Womens Blouses
                </Link>
                <Link
                  href="/search?category=Accessories"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-white"
                  role="menuitem"
                  data-category="Accessories"
                >
                  Accessories
                </Link>
              </div>
            </div>

            <input
              type="text"
              name="q"
              placeholder="Search for products..."
              className="flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2  text-foreground"
            />
            {/* Search button */}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <FaSearch className="h-5 w-5" />
              Search
            </button>
          </form>
        </div>

        <Menu />
      </div>
    </header>
  );
};

export default Header;
