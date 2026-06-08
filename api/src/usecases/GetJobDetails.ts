import type { JobDetailsDaoInterface } from "@/daos/interfaces/JobDetailsDaoInterface";
import type { JobDetailsDto } from "@/daos/dtos/JobDetailsDto";
import { DomainError } from "@/errors/DomainError";

export class GetJobDetails {
    constructor(private readonly jobDetailsDao: JobDetailsDaoInterface) { }

    async execute(jobId: number): Promise<JobDetailsDto> {
        const job = await this.jobDetailsDao.getJobDetails(jobId);
        
        if (!job) {
            throw new DomainError('Job not found');
        }

        return job;
    }
}
