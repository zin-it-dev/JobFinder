import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { PORT } from '@/configs/secrets'
import userRouter from '@/routes/users.route'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

// APIs
app.use('/users', userRouter)

app.listen(PORT, () =>
    console.log(`🚀 Server started on http://localhost:${PORT}`)
)
