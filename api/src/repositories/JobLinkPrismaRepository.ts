import { JobLink } from "@/entities/JobLink";
import type { JobLinkRepositoryInterface } from "./interfaces/JobLinkRepositoryInterface";
import { prisma } from '@/repositories/prisma';

export class JobLinkPrismaRepository implements JobLinkRepositoryInterface {
    constructor(private readonly prismaClient: typeof prisma) { }

    async createMany(links: JobLink[]): Promise<void> {
        if (links.length === 0) return;

        await this.prismaClient.jobLink.createMany({
            data: links.map(l => ({
                title: l.getTitle(),
                url: l.getUrl(),
                jobId: l.getJobId()!
            }))
        });
    }

    async create(link: JobLink): Promise<JobLink> {
        const created = await this.prismaClient.jobLink.create({
            data: {
                title: link.getTitle(),
                url: link.getUrl(),
                jobId: link.getJobId()
            }
        });

        return new JobLink({
            id: created.id,
            title: created.title,
            url: created.url,
            jobId: created.jobId
        });
    }

    async findById(id: number): Promise<JobLink | null> {
        const found = await this.prismaClient.jobLink.findUnique({
            where: { id }
        });

        if (!found) return null;

        return new JobLink({
            id: found.id,
            title: found.title,
            url: found.url,
            jobId: found.jobId
        });
    }

    async update(link: JobLink): Promise<JobLink> {
        const updated = await this.prismaClient.jobLink.update({
            where: { id: link.getId() },
            data: {
                title: link.getTitle(),
                url: link.getUrl()
            }
        });

        return new JobLink({
            id: updated.id,
            title: updated.title,
            url: updated.url,
            jobId: updated.jobId
        });
    }

    async delete(id: number): Promise<void> {
        await this.prismaClient.jobLink.delete({
            where: { id }
        });
    }
}
