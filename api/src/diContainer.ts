import { container } from 'tsyringe';

// Importa as classes puras do nosso projeto
import { prisma } from '@/repositories/prisma';
import { JobStatusPrismaRepository } from '@/repositories/JobStatusPrismaRepository';
import { CreateJobStatus } from '@/usecases/CreateJobStatus';
import { FindAllJobStatus } from '@/usecases/FindAllJobStatus';
import { ReorderJobStatus } from '@/usecases/ReorderJobStatus';
import { UpdateJobStatus } from '@/usecases/UpdateJobStatus';
import { DeleteJobStatus } from '@/usecases/DeleteJobStatus';
import { JobStatusController } from '@/controllers/JobStatusController';

// 1. Prisma Client Singleton
container.registerInstance('PrismaClient', prisma);

// 2. Repositories
container.register('JobStatusRepositoryInterface', {
    useFactory: (c) => new JobStatusPrismaRepository(c.resolve('PrismaClient'))
});

// 3. Use Cases
container.register('CreateJobStatus', {
    useFactory: (c) => new CreateJobStatus(c.resolve('JobStatusRepositoryInterface'))
});
container.register('FindAllJobStatus', {
    useFactory: (c) => new FindAllJobStatus(c.resolve('JobStatusRepositoryInterface'))
});
container.register('ReorderJobStatus', {
    useFactory: (c) => new ReorderJobStatus(c.resolve('JobStatusRepositoryInterface'))
});
container.register('UpdateJobStatus', {
    useFactory: (c) => new UpdateJobStatus(c.resolve('JobStatusRepositoryInterface'))
});
container.register('DeleteJobStatus', {
    useFactory: (c) => new DeleteJobStatus(c.resolve('JobStatusRepositoryInterface'))
});

// 4. Controllers
container.register('JobStatusController', {
    useFactory: (c) => new JobStatusController(
        c.resolve('CreateJobStatus'),
        c.resolve('FindAllJobStatus'),
        c.resolve('ReorderJobStatus'),
        c.resolve('UpdateJobStatus'),
        c.resolve('DeleteJobStatus')
    )
});

export { container };
