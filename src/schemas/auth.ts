import { z } from "zod";

export const RoleEnum = z.enum(["Admin", "Dispatcher"]);
export type RoleType = z.infer<typeof RoleEnum>;

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: RoleEnum.optional(),
});

export type LoginFormValues = {
  email: string;
  password: string;
  role?: "Admin" | "Dispatcher";
};



