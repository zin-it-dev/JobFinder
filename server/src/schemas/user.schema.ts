import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email({ message: 'Invalid email address' }),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    password: z
        .string()
        .min(5, { message: 'Must be exactly 5 characters long' }),
    avatar: z.string().url({ message: 'Avatar must be a valid URL' }).optional()
})

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(5, { message: 'Must be exactly 5 characters long' })
})
