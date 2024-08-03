import { compare } from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/schemas/loginSchema";
import { getUserByEmail } from "./app/actions/authActions";

export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);

          if (
            !user ||
            !user.passwordHash ||
            !(await compare(password, user.passwordHash))
          )
            return null;

          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
