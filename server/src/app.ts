import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

import { PORT } from '@/configs/secrets'
import jobRouter from '@/routes/jobs.route'
import authRouter from '@/routes/auth.routes'

const app = express()

app.use('/static', express.static(path.join(__dirname, 'assets')))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(helmet())

// APIs
app.use('/auth', authRouter)
app.use('/jobs', jobRouter)

app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'Welcome to JobFinder 🍷' })
})

app.listen(PORT, () =>
    console.log(`🚀 Server started on http://localhost:${PORT}`)
)
