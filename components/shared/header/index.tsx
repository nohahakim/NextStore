// Header.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaBars,
  FaChevronDown,
  FaSearch,
  FaSun,
  FaShoppingCart,
  FaUser,
  FaEllipsisH,
} from "react-icons/fa";
import ModeToggle from "./mode-toggle";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-brand-dark to-brand text-white py-4 px-6 shadow-md fixed top-0 z-50">
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
              className="h-10 w-10"
              priority={true}
            />
            <span className="font-bold text-xl tracking-tight">Nextstore</span>
          </Link>
        </div>
        {/* Search bar (desktop) */}
        <div className="hidden md:flex relative flex-1 mx-8">
          <form
            action="/search"
            method="GET"
            className="flex items-center w-full space-x-2"
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
            {/* Search input */}
            <input
              type="text"
              name="q"
              placeholder="Search for products..."
              className="flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
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
        {/* Right side nav */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-3">
            {/* Theme toggle (placeholder) */}

            <ModeToggle />
            {/* Cart */}
            <Link
              href="/cart"
              className="hidden md:flex items-center p-3 rounded-full bg-white/10 hover:bg-white/20 transition relative"
            >
              <FaShoppingCart className="text-lg" />
              <span className="absolute -top-1 -right-1 bg-accent text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
            {/* Sign in */}
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-brand-dark hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <FaUser className="h-5 w-5" />
              Sign In
            </Link>
            {/* User profile */}
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
          {/* Mobile nav toggle */}
          <nav className="md:hidden">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-brand-dark/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              id="mobile-menu-button"
            >
              <FaEllipsisH className="h-6 w-6" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
