import { prisma } from '@/libs/client'
import { generateToken } from '@/utils/token'

import bcrypt from 'bcryptjs'

export async function registerUser(
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string
) {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName
        }
    })
    return generateToken(user.id)
}
