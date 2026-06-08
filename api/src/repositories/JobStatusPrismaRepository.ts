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

    async findAll(): Promise<JobStatus[]> {
        const statuses = await this.prismaClient.jobStatus.findMany({
            orderBy: { order: 'asc' }
        });

        return statuses.map(status => new JobStatus({
            id: status.id,
            name: status.name,
            order: status.order
        }));
    }

    async updateOrders(items: { id: number; order: number; }[]): Promise<void> {
        await this.prismaClient.$transaction(
            items.map(item =>
                this.prismaClient.jobStatus.update({
                    where: { id: item.id },
                    data: { order: item.order }
                })
            )
        );
    }

    async findById(id: number): Promise<JobStatus | null> {
        const status = await this.prismaClient.jobStatus.findUnique({
            where: { id }
        });

        if (!status) return null;

        return new JobStatus({
            id: status.id,
            name: status.name,
            order: status.order
        });
    }

    async findInitialStatus(): Promise<JobStatus | null> {
        const status = await this.prismaClient.jobStatus.findFirst({
            orderBy: { order: 'asc' }
        });

        if (!status) return null;

        return new JobStatus({
            id: status.id,
            name: status.name,
            order: status.order
        });
    }

    async update(jobStatus: JobStatus): Promise<JobStatus> {
        const updated = await this.prismaClient.jobStatus.update({
            where: { id: jobStatus.getId()! },
            data: {
                name: jobStatus.getName(),
                order: jobStatus.getOrder()
            }
        });

        return new JobStatus({
            id: updated.id,
            name: updated.name,
            order: updated.order
        });
    }

    async delete(id: number): Promise<void> {
        await this.prismaClient.jobStatus.delete({
            where: { id }
        });
    }
}
