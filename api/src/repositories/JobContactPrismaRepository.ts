import { JobContact } from "@/entities/JobContact";
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

    async create(contact: JobContact): Promise<JobContact> {
        const created = await this.prismaClient.jobContact.create({
            data: {
                name: contact.getName(),
                role: contact.getRole(),
                linkedin: contact.getLinkedin(),
                phone: contact.getPhone(),
                jobId: contact.getJobId()
            }
        });

        return new JobContact({
            id: created.id,
            name: created.name,
            role: created.role,
            linkedin: created.linkedin,
            phone: created.phone,
            jobId: created.jobId
        });
    }

    async findById(id: number): Promise<JobContact | null> {
        const found = await this.prismaClient.jobContact.findUnique({
            where: { id }
        });

        if (!found) return null;

        return new JobContact({
            id: found.id,
            name: found.name,
            role: found.role,
            linkedin: found.linkedin,
            phone: found.phone,
            jobId: found.jobId
        });
    }

    async update(contact: JobContact): Promise<JobContact> {
        const updated = await this.prismaClient.jobContact.update({
            where: { id: contact.getId() },
            data: {
                name: contact.getName(),
                role: contact.getRole(),
                linkedin: contact.getLinkedin(),
                phone: contact.getPhone()
            }
        });

        return new JobContact({
            id: updated.id,
            name: updated.name,
            role: updated.role,
            linkedin: updated.linkedin,
            phone: updated.phone,
            jobId: updated.jobId
        });
    }

    async delete(id: number): Promise<void> {
        await this.prismaClient.jobContact.delete({
            where: { id }
        });
    }
}
