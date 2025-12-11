// app/admin/layout.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import AdminShell from "./AdminShell";

export const revalidate = 0; 

export default async function AdminLayout({ children }) {
  // read cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const payload = token ? verifyToken(token) : null;

  // if no valid token → redirect to admin login
  if (!payload) {
    redirect("/login");
  }

//   try {
    // await connectDB();
    // const user = await User.findById(payload.id).select("-password");
    // if (!user || user.role !== "admin") {
    //   redirect("/login");
    // }

    return (
      <>
        {/* <body> */}
        <AdminShell>{children}</AdminShell>
        {/* </body> */}
      </>
    );
//   } catch (err) {
//     console.error("[admin layout] auth error:", err);
//     redirect("/login");
//   }
}
