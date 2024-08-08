"use server";

import bcrypt from "bcryptjs";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/lib/schemas/loginSchema";

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(result);

    return { status: "success", data: "Logged in" };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
        default:
          return { status: "error", error: "Something went wrong" };
      }
    } else {
      return { status: "error", error: "Something else went wrong" };
    }
  }
}

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validated = await registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error?.errors };
    }

    const { name, email, password } = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) return { status: "error", error: "User already exists" };

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        profileComplete: true,
      },
    });

    return { status: "success", data: user };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}
