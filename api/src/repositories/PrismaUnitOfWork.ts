import type { UnitOfWork, UnitOfWorkRepositories } from "./interfaces/UnitOfWork";
import { prisma } from "./prisma";
import { JobPrismaRepository } from "./JobPrismaRepository";
import { JobContactPrismaRepository } from "./JobContactPrismaRepository";
import { JobLinkPrismaRepository } from "./JobLinkPrismaRepository";

export class PrismaUnitOfWork implements UnitOfWork {
    constructor(private readonly prismaClient: typeof prisma) { }

    async execute<T>(work: (repos: UnitOfWorkRepositories) => Promise<T>): Promise<T> {
        return await this.prismaClient.$transaction(async (tx) => {
            let jobRepo: JobPrismaRepository | undefined;
            let jobContactRepo: JobContactPrismaRepository | undefined;
            let jobLinkRepo: JobLinkPrismaRepository | undefined;

            const repos: UnitOfWorkRepositories = {
                get jobRepository() {
                    if (!jobRepo) jobRepo = new JobPrismaRepository(tx as any);
                    return jobRepo;
                },
                get jobContactRepository() {
                    if (!jobContactRepo) jobContactRepo = new JobContactPrismaRepository(tx as any);
                    return jobContactRepo;
                },
                get jobLinkRepository() {
                    if (!jobLinkRepo) jobLinkRepo = new JobLinkPrismaRepository(tx as any);
                    return jobLinkRepo;
                }
            };
            
            return await work(repos);
        });
    }
}
