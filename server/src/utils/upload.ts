import { NextFunction, Request, Response } from 'express'
import multer, { Multer } from 'multer'
import sharp from 'sharp'
import {
    v2 as cloudinary,
    UploadApiResponse,
    UploadApiErrorResponse
} from 'cloudinary'
import getGravatarUrl from './gravatar'

type CloudinaryFile = Express.Multer.File & {
    buffer: Buffer
}

const storage = multer.memoryStorage()

export const upload: Multer = multer({ storage: storage })

export const uploadToCloudinary = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const file = req.file as CloudinaryFile

        if (!file) {
            const email = req.body.email

            const gravatarUrl = getGravatarUrl(email)
            req.body.avatar = gravatarUrl
            return next()
        }

        const resizedBuffer: Buffer = await sharp(file.buffer)
            .resize({ width: 800, height: 600 })
            .toBuffer()

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto'
            } as any,
            (
                err: UploadApiErrorResponse | undefined,
                result: UploadApiResponse | undefined
            ) => {
                if (err) {
                    console.error('Cloudinary upload error:', err)
                    return next(err)
                }
                if (!result) {
                    return next(
                        new Error('Cloudinary upload result is undefined')
                    )
                }

                req.body.avatar = result.secure_url
                next()
            }
        )

        uploadStream.end(resizedBuffer)
    } catch (error) {
        console.error('Error in uploadToCloudinary middleware:', error)
        next(error)
    }
}
