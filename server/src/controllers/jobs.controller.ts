import { Request, Response } from 'express'

import { prisma } from '@/libs/client'

export const getJobs = async (req: Request, res: Response) => {
    const jobs = await prisma.job.findMany({
        where: { isActive: true },
        include: { recruiter: { select: { id: true, email: true } } },
        orderBy: { createdAt: 'desc' }
    })
    res.json(jobs)
}
