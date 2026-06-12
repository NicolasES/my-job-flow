import { prisma } from "@/repositories/prisma";
import type { ArchivedJobsDaoInterface } from "./interfaces/ArchivedJobsDaoInterface";
import type { DashboardJobDto } from "./dtos/DashboardJobDto";

export class ArchivedJobsPrismaDao implements ArchivedJobsDaoInterface {
    constructor(private readonly prismaClient: typeof prisma) { }

    async getArchivedJobs(filterText?: string): Promise<DashboardJobDto[]> {
        const whereClause: any = { isArchived: true };

        if (filterText) {
            whereClause.OR = [
                { title: { contains: filterText } },
                { company: { contains: filterText } },
                { description: { contains: filterText } },
                { mandatorySkills: { some: { name: { contains: filterText } } } },
                { recommendedSkills: { some: { name: { contains: filterText } } } }
            ];
        }

        const jobs = await this.prismaClient.job.findMany({
            where: whereClause,
            orderBy: {
                appliedAt: 'desc'
            }
        });

        return jobs.map((job: any) => {
            const date = new Date(job.appliedAt);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}`;
            
            return {
                id: job.id,
                title: job.title,
                company: job.company,
                location: job.workModel,
                date: formattedDate,
                statusId: job.statusId
            };
        });
    }
}
