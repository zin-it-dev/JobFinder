import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

export const PORT = process.env.PORT || 8000

export const SECRET_KEY = process.env.JWT_SECRET || 'secret'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const ACCESS_TOKEN_EXPIRES_IN = '24h'

export const REFRESH_TOKEN_EXPIRES_IN = '7d'
