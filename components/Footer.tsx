import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-secondary-dark to-brand text-white mt-10 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-5 py-6 flex flex-col md:flex-row items-center justify-between">
        <span className="text-center text-sm md:text-base">
          © {currentYear} {APP_NAME}. All Rights Reserved.
        </span>
        <nav aria-label="Social Media" className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href="#"
            aria-label="Facebook"
            className="hover:text-accent transition transform hover:scale-110"
          >
            <FaFacebookF size={20} />
          </Link>
          <Link
            href="#"
            aria-label="Twitter"
            className="hover:text-accent transition transform hover:scale-110"
          >
            <FaTwitter size={20} />
          </Link>
          <Link
            href="#"
            aria-label="Instagram"
            className="hover:text-accent transition transform hover:scale-110"
          >
            <FaInstagram size={20} />
          </Link>
          <Link
            href="#"
            aria-label="LinkedIn"
            className="hover:text-accent transition transform hover:scale-110"
          >
            <FaLinkedinIn size={20} />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
