import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import type { JobStatusRepositoryInterface } from "../repositories/interfaces/JobStatusRepositoryInterface";
import { DomainError } from "../errors/DomainError";

export type ChangeJobStatusInput = {
    jobId: number;
    statusId: number;
};

export class ChangeJobStatus {
    constructor(
        private jobRepository: JobRepositoryInterface,
        private jobStatusRepository: JobStatusRepositoryInterface
    ) { }

    async execute(input: ChangeJobStatusInput): Promise<void> {
        const { jobId, statusId } = input;
        const job = await this.jobRepository.findById(jobId);
        if (!job) {
            throw new DomainError('Job not found');
        }
        const status = await this.jobStatusRepository.findById(statusId);
        if (!status) {
            throw new DomainError('Job Status not found');
        }
        job.setStatus(status);
        await this.jobRepository.update(job);
    }
}
