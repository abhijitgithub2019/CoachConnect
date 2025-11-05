"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
export function LoginButton({ isLogOut }) {
  const navigateToLogin = () => {
    if (isLogOut) {
      redirect("./");
    } else {
      redirect("./login");
    }
  };
  return (
    <Link
      href="/login"
      className={`hover:text-green-700 font-semibold px-4 py-2 rounded-md ${
        isLogOut ? "bg-yellow-500 text-black font-bold" : ""
      }`}
      onClick={navigateToLogin}
    >
      {isLogOut ? "Logout" : "Login/signUp"}
    </Link>
  );
}
