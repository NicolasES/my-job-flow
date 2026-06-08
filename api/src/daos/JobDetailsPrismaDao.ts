import type { JobDetailsDaoInterface } from "./interfaces/JobDetailsDaoInterface";
import type { JobDetailsDto } from "./dtos/JobDetailsDto";
import { prisma } from "@/repositories/prisma";

export class JobDetailsPrismaDao implements JobDetailsDaoInterface {
    constructor(private readonly prismaClient: typeof prisma) { }

    async getJobDetails(jobId: number): Promise<JobDetailsDto | null> {
        const job = await this.prismaClient.job.findUnique({
            where: { id: jobId },
            include: {
                status: true,
                contacts: true,
                links: true,
                comments: true,
                mandatorySkills: true,
                recommendedSkills: true
            }
        });

        if (!job) return null;

        return {
            id: job.id,
            title: job.title,
            company: job.company,
            workModel: job.workModel,
            salary: job.salary,
            description: job.description,
            appliedAt: job.appliedAt,
            createdAt: job.createdAt,
            status: {
                id: job.status.id,
                name: job.status.name,
                order: job.status.order
            },
            contacts: job.contacts.map(c => ({
                id: c.id,
                name: c.name,
                role: c.role,
                linkedin: c.linkedin,
                phone: c.phone
            })),
            links: job.links.map(l => ({
                id: l.id,
                title: l.title,
                url: l.url
            })),
            comments: job.comments.map(c => ({
                id: c.id,
                text: c.text,
                date: c.date
            })),
            mandatorySkills: job.mandatorySkills.map(s => ({
                id: s.id,
                name: s.name
            })),
            recommendedSkills: job.recommendedSkills.map(s => ({
                id: s.id,
                name: s.name
            }))
        };
    }
}
