import jwt from 'jsonwebtoken'

import { SECRET_KEY } from '@/configs/secrets'

export function generateToken(userId: number) {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '24h' })
}
