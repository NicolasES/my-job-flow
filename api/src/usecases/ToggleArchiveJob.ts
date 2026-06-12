import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import { DomainError } from "@/errors/DomainError";

export class ToggleArchiveJob {
    constructor(
        private jobRepository: JobRepositoryInterface
    ) { }

    async execute(id: number, isArchived: boolean): Promise<void> {
        const job = await this.jobRepository.findById(id);
        if (!job) {
            throw new DomainError("Job not found");
        }
        if (isArchived) {
            job.archive();
        } else {
            job.unarchive();
        }
        await this.jobRepository.update(job);
    }
}
