import type { JobStatusRepositoryInterface } from '@/repositories/interfaces/JobStatusRepositoryInterface';
import { JobStatus } from '@/entities/JobStatus';
import { prisma } from '@/repositories/prisma';

export class JobStatusPrismaRepository implements JobStatusRepositoryInterface {
    constructor(private prismaClient: typeof prisma) { }

    async create(jobStatus: JobStatus): Promise<JobStatus> {
        const created = await this.prismaClient.jobStatus.create({
            data: {
                name: jobStatus.getName(),
                order: jobStatus.getOrder()
            }
        });

        return new JobStatus({
            id: created.id,
            name: created.name,
            order: created.order
        });
    }
}
