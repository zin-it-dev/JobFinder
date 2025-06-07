import crypto from 'crypto'

export default function getGravatarUrl(email = '', size = 80): string {
    const trimmedEmail = email.trim().toLowerCase()
    const hash = crypto.createHash('sha256').update(trimmedEmail).digest('hex')
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon&r=pg`
}
