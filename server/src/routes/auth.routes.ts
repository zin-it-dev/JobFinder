import { Router } from 'express'

import { login, register } from '@/controllers/auth.controller'
import { validateData } from '@/middlewares/validation.middleware'
import { loginSchema, registerSchema } from '@/schemas/user.schema'
import { upload, uploadToCloudinary } from '@/utils/upload'

const router = Router()

router.post(
    '/',
    upload.single('avatar'),
    uploadToCloudinary,
    validateData(registerSchema),
    register
)

router.post('/token', validateData(loginSchema), login)

export default router
