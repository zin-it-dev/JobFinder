import { NextFunction, Request, Response } from 'express'
import { STATUS_CODES } from 'http'
import { StatusCodes } from 'http-status-codes'
import { z, ZodError } from 'zod'

export const validateData = (schema: z.ZodObject<any, any>) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const result = schema.safeParse(req.body)

            if (!result.success) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: 'Invalid input data',
                    errors: result.error.flatten().fieldErrors
                })
            }

            req.body = result.data

            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`
                }))
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: 'Invalid input data',
                    errors: errors
                })
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: 'Internal Server Error'
                })
            }
        }
    }
}
