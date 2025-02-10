"use client";

import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Image
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-destructive">Could not find requested page.</p>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-accent text-white rounded-md shadow-md hover:bg-accent-dark transition"
          onClick={() => window.history.back()} // Go back to previous page
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
