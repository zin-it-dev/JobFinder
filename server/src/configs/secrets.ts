import * as dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 8000

export const SECRET_KEY = process.env.JWT_SECRET
