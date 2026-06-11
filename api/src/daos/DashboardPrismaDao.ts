import { prisma } from "@/repositories/prisma";
import type { DashboardDaoInterface } from "./interfaces/DashboardDaoInterface";
import type { DashboardColumnDto } from "./dtos/DashboardJobDto";

export class DashboardPrismaDao implements DashboardDaoInterface {
    constructor(private readonly prismaClient: typeof prisma) { }

    async getDashboardJobs(filterText?: string): Promise<DashboardColumnDto[]> {
        // 1. Busca todos os status possíveis em ordem
        const statuses = await this.prismaClient.jobStatus.findMany({
            orderBy: { order: 'asc' }
        });

        // 2. Busca vagas aplicando o filtro se existir
        const whereClause = filterText ? {
            OR: [
                { title: { contains: filterText } },
                { company: { contains: filterText } },
                { description: { contains: filterText } },
                { mandatorySkills: { some: { name: { contains: filterText } } } },
                { recommendedSkills: { some: { name: { contains: filterText } } } }
            ]
        } : {};

        const jobs = await this.prismaClient.job.findMany({
            where: whereClause,
            orderBy: {
                appliedAt: 'desc'
            }
        });

        // 3. Agrupa as vagas dentro das colunas
        return statuses.map(status => {
            const statusJobs = jobs
                .filter(job => job.statusId === status.id)
                .map((job: any) => {
                    const date = new Date(job.appliedAt);
                    const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}`;
                    
                    return {
                        id: job.id,
                        title: job.title,
                        company: job.company,
                        location: job.workModel,
                        date: formattedDate
                    };
                });

            return {
                id: status.id,
                name: status.name,
                order: status.order,
                jobs: statusJobs
            };
        });
    }
}
