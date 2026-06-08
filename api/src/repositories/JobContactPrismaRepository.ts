import type { JobContact } from "@/entities/JobContact";
import type { JobContactRepositoryInterface } from "./interfaces/JobContactRepositoryInterface";
import { prisma } from '@/repositories/prisma';

export class JobContactPrismaRepository implements JobContactRepositoryInterface {
    constructor(private readonly prismaClient: typeof prisma) { }

    async createMany(contacts: JobContact[]): Promise<void> {
        if (contacts.length === 0) return;

        await this.prismaClient.jobContact.createMany({
            data: contacts.map(c => ({
                name: c.getName(),
                role: c.getRole(),
                linkedin: c.getLinkedin(),
                phone: c.getPhone(),
                jobId: c.getJobId()!
            }))
        });
    }
}
