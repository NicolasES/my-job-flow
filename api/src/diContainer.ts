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
import { JobContactPrismaRepository } from '@/repositories/JobContactPrismaRepository';
import { JobLinkPrismaRepository } from '@/repositories/JobLinkPrismaRepository';
import { JobCommentPrismaRepository } from '@/repositories/JobCommentPrismaRepository';
import { CreateJob } from '@/usecases/CreateJob';
import { GetJobDetails } from '@/usecases/GetJobDetails';
import { UpdateJob } from '@/usecases/UpdateJob';
import { ChangeJobStatus } from '@/usecases/ChangeJobStatus';
import { AddJobSkill } from '@/usecases/AddJobSkill';
import { RemoveJobSkill } from '@/usecases/RemoveJobSkill';
import { AddJobContact } from '@/usecases/AddJobContact';
import { UpdateJobContact } from '@/usecases/UpdateJobContact';
import { DeleteJobContact } from '@/usecases/DeleteJobContact';
import { AddJobLink } from '@/usecases/AddJobLink';
import { UpdateJobLink } from '@/usecases/UpdateJobLink';
import { DeleteJobLink } from '@/usecases/DeleteJobLink';
import { AddJobComment } from '@/usecases/AddJobComment';
import { UpdateJobComment } from '@/usecases/UpdateJobComment';
import { DeleteJobComment } from '@/usecases/DeleteJobComment';
import { JobController } from '@/controllers/JobController';
import { JobCommentController } from '@/controllers/JobCommentController';

import { PrismaUnitOfWork } from "@/repositories/PrismaUnitOfWork";
import { JobDetailsPrismaDao } from '@/daos/JobDetailsPrismaDao';
import { DashboardPrismaDao } from '@/daos/DashboardPrismaDao';
import { GetDashboardJobs } from '@/usecases/GetDashboardJobs';
import { DashboardController } from '@/controllers/DashboardController';

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
container.register('DashboardDaoInterface', {
    useValue: new DashboardPrismaDao(prisma)
});
container.register('JobContactRepositoryInterface', {
    useValue: new JobContactPrismaRepository(prisma)
});
container.register('JobLinkRepositoryInterface', {
    useValue: new JobLinkPrismaRepository(prisma)
});
container.register('JobCommentRepositoryInterface', {
    useValue: new JobCommentPrismaRepository(prisma)
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

container.register('UpdateJob', {
    useFactory: (c) => new UpdateJob(
        c.resolve('JobRepositoryInterface')
    )
});
container.register('ChangeJobStatus', {
    useFactory: (c) => new ChangeJobStatus(
        c.resolve('JobRepositoryInterface'),
        c.resolve('JobStatusRepositoryInterface')
    )
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
container.register('AddJobLink', {
    useFactory: (c) => new AddJobLink(
        c.resolve('JobRepositoryInterface'),
        c.resolve('JobLinkRepositoryInterface')
    )
});
container.register('UpdateJobLink', {
    useFactory: (c) => new UpdateJobLink(
        c.resolve('JobLinkRepositoryInterface')
    )
});
container.register('DeleteJobLink', {
    useFactory: (c) => new DeleteJobLink(
        c.resolve('JobLinkRepositoryInterface')
    )
});

container.register('AddJobComment', {
    useFactory: (c) => new AddJobComment(
        c.resolve('JobRepositoryInterface'),
        c.resolve('JobCommentRepositoryInterface')
    )
});

container.register('UpdateJobComment', {
    useFactory: (c) => new UpdateJobComment(c.resolve('JobRepositoryInterface'), c.resolve('JobCommentRepositoryInterface'))
});
container.register('DeleteJobComment', {
    useFactory: (c) => new DeleteJobComment(c.resolve('JobRepositoryInterface'), c.resolve('JobCommentRepositoryInterface'))
});
container.register('GetDashboardJobs', {
    useFactory: (c) => new GetDashboardJobs(c.resolve('DashboardDaoInterface'))
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
        c.resolve('DeleteJobContact'),
        c.resolve('AddJobLink'),
        c.resolve('UpdateJobLink'),
        c.resolve('DeleteJobLink'),
        c.resolve('ChangeJobStatus')
    )
});

container.register('JobCommentController', {
    useFactory: (c) => new JobCommentController(
        c.resolve('AddJobComment'),
        c.resolve('UpdateJobComment'),
        c.resolve('DeleteJobComment')
    )
});

container.register('DashboardController', {
    useFactory: (c) => new DashboardController(c.resolve('GetDashboardJobs'))
});

container.register('SkillController', {
    useFactory: (c) => new SkillController(
        c.resolve('CreateSkill'),
        c.resolve('FindAllSkills'),
        c.resolve('DeleteSkill')
    )
});

export { container };
