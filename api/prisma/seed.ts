import { prisma } from '../src/repositories/prisma.js';

async function main() {
    const count = await prisma.jobStatus.count();
    
    if (count === 0) {
        await prisma.jobStatus.createMany({
            data: [
                { name: 'Aberto', order: 1 },
                { name: 'Entrevista', order: 2 },
                { name: 'Proposta', order: 3 },
                { name: 'Rejeitado', order: 4 }
            ]
        });
        console.log('Seed completed: Job statuses added.');
    } else {
        console.log('Seed skipped: Job statuses already exist.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // disconnect is handled by Prisma Client instance
    });
