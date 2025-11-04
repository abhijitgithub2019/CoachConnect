import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const pris = new PrismaClient();

export async function POST(req) {
  // console.log("hello: ", await req.json());
  // const data = await req.json();
  try {
    let { name, email, password } = await req.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" })
      );
    }
    const existingUser = await pris.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "user is already exists " }),
        { status: 400 }
      );
    }

    password = await bcrypt.hash(password, 10);
    const user = await pris.user.create({
      data: { name, email, password },
    });

    return new Response(JSON.stringify({ message: "User created", user }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 400,
    });
  }
}
