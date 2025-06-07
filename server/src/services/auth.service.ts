import { prisma } from '@/libs/client'
import { generateToken } from '@/utils/token'

import bcrypt from 'bcryptjs'

export async function registerUser(
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar?: string
) {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            avatar
        }
    })

    return generateToken(user.id)
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findFirst({
        where: { email }
    })

    if (!user) {
        return {
            user: null,
            passwordMatch: false,
            token: null
        }
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return {
            user,
            passwordMatch: false,
            token: null
        }
    }

    const { accessToken, refreshToken } = generateToken(user.id)

    return { user, passwordMatch, accessToken, refreshToken }
}
