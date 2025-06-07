import jwt from 'jsonwebtoken'

import {
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN,
    SECRET_KEY
} from '@/configs/secrets'

export function generateToken(userId: number) {
    const accessToken = jwt.sign({ id: userId }, SECRET_KEY, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN
    })

    const refreshToken = jwt.sign({ id: userId }, SECRET_KEY, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN
    })

    return { accessToken, refreshToken }
}
