'use client'
import Link from "next/link";
import { redirect } from "next/navigation";
export function LoginButton() {
    const navigateToLogin = ()=> {
        redirect("./login");
    }
    return(
        <Link href="/login" className="hover:text-green-700 font-semibold" onClick={navigateToLogin}>
        Login/signUp
      </Link>
    )
}