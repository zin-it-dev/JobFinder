import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export const validateData = (schema: z.ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction): any => {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Invalid input data',
                errors: result.error.flatten().fieldErrors
            })
        }

        req.body = result.data

        next()
    }
}
