import { Metadata } from "next"; // 🛠️ Imports type for page metadata
import { auth } from "@/auth"; // 🔐 Fetches the session
import { SessionProvider } from "next-auth/react"; // 🌐 Provides session to client components
import ProfileForm from "./profile-form";

export const metadata: Metadata = {
  title: "Customer Profile", // 📝 Sets the page title
};

export default async function ProfilePage() {
  // 🚀 Async server component
  const session = await auth(); // ⏳ Retrieves session data
  return (
    <SessionProvider session={session}>
      {/* // 🔄 Wraps content with session context */}
      <div className="max-w-md mx-auto space-y-4">
        {/* // 🎨 Centers and spaces content */}
        <h2 className="text-2xl font-bold">Profile: {session?.user?.name}</h2>
        {/* // 👤 Shows user’s name */}
        <ProfileForm />
        {/* // 📝 Renders the profile form */}
      </div>
    </SessionProvider>
  );
}
