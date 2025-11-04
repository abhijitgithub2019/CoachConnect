import { signIn } from "next-auth/react";
export async function PostUser(form) {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res;
}

export async function LoginUser(form) {
  const res = await signIn("credentials", {
    redirect: false, // don't redirect automatically
    email: form.email,
    password: form.password,
  });
  return res;
}
