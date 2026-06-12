import type { JobRepositoryInterface } from "./interfaces/JobRepositoryInterface";
import { Job } from "@/entities/Job";
import { JobStatus } from "@/entities/JobStatus";
import { prisma } from '@/repositories/prisma';

export class JobPrismaRepository implements JobRepositoryInterface {
    constructor(
        private readonly prismaClient: typeof prisma
    ) { }

    async create(job: Job): Promise<Job> {
        const created = await this.prismaClient.job.create({
            data: {
                title: job.getTitle(),
                company: job.getCompany(),
                workModel: job.getWorkModel(),
                salary: job.getSalary(),
                description: job.getDescription(),
                appliedAt: job.getAppliedAt(),
                createdAt: job.getCreatedAt(),
                isArchived: job.getIsArchived(),
                statusId: job.getStatus().getId()!,
            },
            include: {
                status: true
            }
        });

        return new Job({
            id: created.id,
            title: created.title,
            company: created.company,
            workModel: created.workModel as any,
            salary: created.salary,
            description: created.description,
            appliedAt: created.appliedAt,
            createdAt: created.createdAt,
            isArchived: created.isArchived,
            status: new JobStatus({
                id: created.status.id,
                name: created.status.name,
                order: created.status.order
            })
        });
    }

    async findById(id: number): Promise<Job | null> {
        const found = await this.prismaClient.job.findUnique({
            where: { id },
            include: { status: true }
        });

        if (!found) return null;

        return new Job({
            id: found.id,
            title: found.title,
            company: found.company,
            workModel: found.workModel as any,
            salary: found.salary,
            description: found.description,
            appliedAt: found.appliedAt,
            createdAt: found.createdAt,
            isArchived: found.isArchived,
            status: new JobStatus({
                id: found.status.id,
                name: found.status.name,
                order: found.status.order
            })
        });
    }

    async update(job: Job): Promise<Job> {
        const updated = await this.prismaClient.job.update({
            where: { id: job.getId() },
            data: {
                title: job.getTitle(),
                company: job.getCompany(),
                workModel: job.getWorkModel(),
                salary: job.getSalary(),
                description: job.getDescription(),
                appliedAt: job.getAppliedAt(),
                isArchived: job.getIsArchived(),
                statusId: job.getStatus().getId()!,
            },
            include: {
                status: true
            }
        });

        return new Job({
            id: updated.id,
            title: updated.title,
            company: updated.company,
            workModel: updated.workModel as any,
            salary: updated.salary,
            description: updated.description,
            appliedAt: updated.appliedAt,
            createdAt: updated.createdAt,
            isArchived: updated.isArchived,
            status: new JobStatus({
                id: updated.status.id,
                name: updated.status.name,
                order: updated.status.order
            })
        });
    }

    async associateSkills(jobId: number, mandatorySkillsIds: number[], recommendedSkillsIds: number[]): Promise<void> {
        if (mandatorySkillsIds.length === 0 && recommendedSkillsIds.length === 0) return;

        await this.prismaClient.job.update({
            where: { id: jobId },
            data: {
                mandatorySkills: {
                    connect: mandatorySkillsIds.map(id => ({ id }))
                },
                recommendedSkills: {
                    connect: recommendedSkillsIds.map(id => ({ id }))
                }
            }
        });
    }

    async addSkill(jobId: number, skillId: number, type: 'mandatory' | 'recommended'): Promise<void> {
        if (type === 'mandatory') {
            await this.prismaClient.job.update({
                where: { id: jobId },
                data: { mandatorySkills: { connect: { id: skillId } } }
            });
        } else {
            await this.prismaClient.job.update({
                where: { id: jobId },
                data: { recommendedSkills: { connect: { id: skillId } } }
            });
        }
    }

    async removeSkill(jobId: number, skillId: number, type: 'mandatory' | 'recommended'): Promise<void> {
        if (type === 'mandatory') {
            await this.prismaClient.job.update({
                where: { id: jobId },
                data: { mandatorySkills: { disconnect: { id: skillId } } }
            });
        } else {
            await this.prismaClient.job.update({
                where: { id: jobId },
                data: { recommendedSkills: { disconnect: { id: skillId } } }
            });
        }
    }

    async delete(id: number): Promise<void> {
        await this.prismaClient.job.delete({
            where: { id }
        });
    }
}
