"use server";

import bcrypt from "bcryptjs";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";

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

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

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
