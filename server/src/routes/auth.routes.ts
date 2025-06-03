import { Router } from 'express'

import { register } from '@/controllers/auth.controller'
import { validateData } from '@/middlewares/validation.middleware'
import { User } from '@/schemas/user.schema'

const router = Router()

router.post('/register', validateData(User), register)

export default router
