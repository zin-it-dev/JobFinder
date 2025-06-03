import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '@/libs/client'
import { registerUser } from '@/services/auth.service'

export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password, email, firstName, lastName } = req.body

        const existing = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }]
            }
        })

        if (existing)
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: 'Email or username already exists' })

        const token = await registerUser(
            email,
            username,
            password,
            firstName,
            lastName
        )

        res.status(StatusCodes.CREATED).json({
            message: 'User Created Successfully',
            token
        })
    } catch (error) {
        console.error(`Error: ${error}`)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error'
        })
    }
}
