import { JobComment } from "@/entities/JobComment";
import type { JobCommentRepositoryInterface } from "./interfaces/JobCommentRepositoryInterface";
import { prisma } from '@/repositories/prisma';

export class JobCommentPrismaRepository implements JobCommentRepositoryInterface {
    constructor(private readonly prismaClient: typeof prisma) { }

    async create(comment: JobComment): Promise<JobComment> {
        const created = await this.prismaClient.jobComment.create({
            data: {
                text: comment.getText(),
                date: comment.getDate(),
                jobId: comment.getJobId()
            }
        });

        return new JobComment({
            id: created.id,
            text: created.text,
            date: created.date,
            jobId: created.jobId
        });
    }

    async findById(id: number): Promise<JobComment | null> {
        const found = await this.prismaClient.jobComment.findUnique({
            where: { id }
        });

        if (!found) return null;

        return new JobComment({
            id: found.id,
            text: found.text,
            date: found.date,
            jobId: found.jobId
        });
    }

    async update(comment: JobComment): Promise<void> {
        await this.prismaClient.jobComment.update({
            where: { id: comment.getId() },
            data: {
                text: comment.getText()
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.prismaClient.jobComment.delete({
            where: { id }
        });
    }
}
