"use client";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { signInDefaultValues } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import { Sub } from "@radix-ui/react-dropdown-menu";

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    message: "",
    success: false,
  });
  const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl"
      >
        {pending ? "Signing In..." : "Sign In"}
      </button>
    );
  };

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div>
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={signInDefaultValues.email}
          autoComplete="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          defaultValue={signInDefaultValues.password}
          autoComplete="current-password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
        />
      </div>

      <SubmitButton />

      {data && !data.success && (
        <div className="text-center text-red-500">{data.message}</div>
      )}

      <div className="text-center text-sm text-gray-600 mt-4">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-purple-600 hover:text-purple-800 font-semibold underline-offset-4 hover:underline transition-colors"
          target="_self"
        >
          Create Account
        </Link>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
