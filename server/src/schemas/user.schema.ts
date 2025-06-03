import { z } from 'zod'

export const User = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email({ message: 'Invalid email address' }),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    password: z
        .string()
        .length(5, { message: 'Must be exactly 5 characters long' })
})

export const UserLogIn = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .length(5, { message: 'Must be exactly 5 characters long' })
})
