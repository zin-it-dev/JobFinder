import { faker } from '@faker-js/faker'

import { prisma } from './client'

async function main() {
    console.log(`Start seeding ...`)

    for (let i = 0; i < 10; i++) {
        const user = await prisma.user.create({
            data: {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                username: faker.internet.username(),
                email: faker.internet.email(),
                password: faker.internet.password()
            }
        })

        console.log(`Created user with id: ${user.id}`)
    }

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
