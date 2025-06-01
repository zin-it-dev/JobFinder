import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) => {
    res.send('Job Finder API is running!')
})

const PORT = 8000

app.listen(PORT, () =>
    console.log(`🚀 Server started on http://localhost:${PORT}`)
)
