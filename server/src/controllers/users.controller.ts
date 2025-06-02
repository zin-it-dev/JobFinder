import { Request, Response } from 'express'

import { prisma } from '@/libs/client'

export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany()
    res.json(users)
}

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password, firstName, lastName } = req.body

    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password,
                firstName,
                lastName
            }
        })

        res.status(201).json(newUser)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Lỗi tạo user' })
    }
}
