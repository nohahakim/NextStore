import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignIn = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }
  return (
    <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
      <div className="mb-10 flex flex-col items-center">
        <Link
          href="/"
          className="mb-8 transform hover:scale-105 transition-transform"
        >
          <Image
            priority
            src="/images/logo.svg"
            width={96}
            height={96}
            alt="Logo"
            className="drop-shadow-lg"
          />
        </Link>
        <h1 className="text-4xl font-extrabold leading-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent text-center mb-3">
          Sign In
        </h1>
        <p className="text-gray-600 text-center text-base sm:text-lg">
          Sign in to continue to your account
        </p>
      </div>
      <CredentialsSignInForm />
    </div>
  );
};

export default SignIn;
