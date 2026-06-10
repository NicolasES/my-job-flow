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

import { JobPrismaRepository } from '@/repositories/JobPrismaRepository';
import { CreateJob } from '@/usecases/CreateJob';
import { GetJobDetails } from '@/usecases/GetJobDetails';
import { UpdateJob } from '@/usecases/UpdateJob';
import { AddJobSkill } from '@/usecases/AddJobSkill';
import { RemoveJobSkill } from '@/usecases/RemoveJobSkill';
import { AddJobContact } from '@/usecases/AddJobContact';
import { UpdateJobContact } from '@/usecases/UpdateJobContact';
import { DeleteJobContact } from '@/usecases/DeleteJobContact';
import { JobController } from '@/controllers/JobController';

import { PrismaUnitOfWork } from "@/repositories/PrismaUnitOfWork";
import { JobDetailsPrismaDao } from '@/daos/JobDetailsPrismaDao';

// 1. Prisma Client Singleton
container.registerInstance('PrismaClient', prisma);

// 2. Repositories & DAOs
container.register('SkillRepositoryInterface', {
    useValue: new SkillPrismaRepository(prisma)
});
container.register('JobStatusRepositoryInterface', {
    useValue: new JobStatusPrismaRepository(prisma)
});
container.register('JobRepositoryInterface', {
    useValue: new JobPrismaRepository(prisma)
});
container.register('UnitOfWork', {
    useValue: new PrismaUnitOfWork(prisma)
});
container.register('JobDetailsDaoInterface', {
    useValue: new JobDetailsPrismaDao(prisma)
});

// 3. Use Cases
container.register('CreateJobStatus', {
    useFactory: (c) => new CreateJobStatus(c.resolve('JobStatusRepositoryInterface'))
});
container.register('FindAllJobStatus', {
    useFactory: (c) => new FindAllJobStatus(c.resolve('JobStatusRepositoryInterface'))
});
container.register('UpdateJobStatus', {
    useFactory: (c) => new UpdateJobStatus(c.resolve('JobStatusRepositoryInterface'))
});
container.register('ReorderJobStatus', {
    useFactory: (c) => new ReorderJobStatus(c.resolve('JobStatusRepositoryInterface'))
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

container.register('CreateJob', {
    useFactory: (c) => new CreateJob(
        c.resolve('UnitOfWork'),
        c.resolve('JobStatusRepositoryInterface'),
        c.resolve('SkillRepositoryInterface')
    )
});

container.register('GetJobDetails', {
    useFactory: (c) => new GetJobDetails(c.resolve('JobDetailsDaoInterface'))
});

container.register('UpdateJob', {
    useFactory: (c) => new UpdateJob(c.resolve('JobRepositoryInterface'))
});

container.register('AddJobSkill', {
    useFactory: (c) => new AddJobSkill(
        c.resolve('JobRepositoryInterface'),
        c.resolve('SkillRepositoryInterface')
    )
});

container.register('RemoveJobSkill', {
    useFactory: (c) => new RemoveJobSkill(
        c.resolve('JobRepositoryInterface'),
        c.resolve('SkillRepositoryInterface')
    )
});

container.register('AddJobContact', {
    useFactory: (c) => new AddJobContact(
        c.resolve('JobRepositoryInterface'),
        c.resolve('JobContactRepositoryInterface')
    )
});

container.register('UpdateJobContact', {
    useFactory: (c) => new UpdateJobContact(
        c.resolve('JobContactRepositoryInterface')
    )
});

container.register('DeleteJobContact', {
    useFactory: (c) => new DeleteJobContact(
        c.resolve('JobContactRepositoryInterface')
    )
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

container.register('JobController', {
    useFactory: (c) => new JobController(
        c.resolve('CreateJob'),
        c.resolve('GetJobDetails'),
        c.resolve('UpdateJob'),
        c.resolve('AddJobSkill'),
        c.resolve('RemoveJobSkill'),
        c.resolve('AddJobContact'),
        c.resolve('UpdateJobContact'),
        c.resolve('DeleteJobContact')
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
