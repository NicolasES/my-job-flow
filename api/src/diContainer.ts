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

import { SkillPrismaRepository } from '@/repositories/SkillPrismaRepository';
import { CreateSkill } from '@/usecases/CreateSkill';
import { FindAllSkills } from '@/usecases/FindAllSkills';
import { DeleteSkill } from '@/usecases/DeleteSkill';
import { SkillController } from '@/controllers/SkillController';

// 1. Prisma Client Singleton
container.registerInstance('PrismaClient', prisma);

// 2. Repositories
container.register('JobStatusRepositoryInterface', {
    useValue: new JobStatusPrismaRepository(prisma)
});
container.register('SkillRepositoryInterface', {
    useValue: new SkillPrismaRepository(prisma)
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

container.register('CreateSkill', {
    useFactory: (c) => new CreateSkill(c.resolve('SkillRepositoryInterface'))
});
container.register('FindAllSkills', {
    useFactory: (c) => new FindAllSkills(c.resolve('SkillRepositoryInterface'))
});
container.register('DeleteSkill', {
    useFactory: (c) => new DeleteSkill(c.resolve('SkillRepositoryInterface'))
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
container.register('SkillController', {
    useFactory: (c) => new SkillController(
        c.resolve('CreateSkill'),
        c.resolve('FindAllSkills'),
        c.resolve('DeleteSkill')
    )
});

export { container };
