import type { JobLink } from "@/entities/JobLink";
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
}
