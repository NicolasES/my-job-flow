import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import { DomainError } from "../errors/DomainError";
import { Job } from "../entities/Job";

export type UpdateJobInput = {
    title: string;
    company: string;
    workModel: 'remote' | 'hybrid' | 'onsite';
    salary?: number | null;
    description: string;
    appliedAt: Date;
}

export class UpdateJob {
    constructor(
        private readonly jobRepository: JobRepositoryInterface
    ) { }

    async execute(jobId: number, input: UpdateJobInput): Promise<Job> {
        const job = await this.jobRepository.findById(jobId);

        if (!job) {
            throw new DomainError(`Job with id ${jobId} not found`);
        }

        job.setTitle(input.title);
        job.setCompany(input.company);
        job.setWorkModel(input.workModel);
        job.setSalary(input.salary ?? null);
        job.setDescription(input.description);
        job.setAppliedAt(input.appliedAt);

        return await this.jobRepository.update(job);
    }
}
