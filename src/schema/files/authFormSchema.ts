import { z } from "zod";

export const loginFormSchema = z.object({
          email: z.string().email({ message: "Email is required" }),
          password: z.string().min(1, { message: "Password is required" }),
});

export const registerFormSchema = z.object({
          username: z.string().min(1, { message: "Username is required" }),
          email: z.string().email({ message: "Email is required" }),
          password: z.string().min(1, { message: "Password is required" }),
})