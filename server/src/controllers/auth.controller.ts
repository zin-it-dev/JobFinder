import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { prisma } from '@/libs/client'
import { loginUser, registerUser } from '@/services/auth.service'

export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password, email, firstName, lastName } = req.body

        const avatar = req.body.avatar

        const existing = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }]
            }
        })

        if (existing)
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Email or username already exists'
            })

        const { accessToken, refreshToken } = await registerUser(
            email,
            username,
            password,
            firstName,
            lastName,
            avatar
        )

        res.status(StatusCodes.CREATED).json({
            message: 'User Created Successfully',
            accessToken,
            refreshToken
        })
    } catch (error) {
        console.error(`Error: ${error}`)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error'
        })
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body

        const { user, passwordMatch, accessToken, refreshToken } =
            await loginUser(email, password)

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'User not found'
            })
        }

        if (!passwordMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Incorrect password'
            })
        }

        res.status(StatusCodes.OK).json({
            message: 'Get token successful',
            accessToken,
            refreshToken
        })
    } catch (error) {
        console.error(`Error: ${error}`)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error'
        })
    }
}
