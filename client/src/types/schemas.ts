import { z } from "zod";

export const registerSchema = z
    .object({
        username: z.string().min(3, "Username must be at least 3 characters"),
        email: z
            .string()
            .email({ message: "Invalid email address" })
            .regex(/^[^@ ]+@[^@ ]+.[^@ .]{2,}$/, {
                message: "Invalid email format",
            }),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        password: z
            .string()
            .min(5, { message: "Must be exactly 5 characters long" }),
        confirmPassword: z
            .string()
            .min(5, { message: "Must be exactly 5 characters long" }),
        avatar: z.any().optional(),
    })
    .required()
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type registerValues = z.infer<typeof registerSchema>;
