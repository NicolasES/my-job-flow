import type { JobStatusRepositoryInterface } from "@/repositories/interfaces/JobStatusRepositoryInterface";
import { DomainError } from "@/errors/DomainError";

export class DeleteJobStatus {
    constructor(
        private readonly statusRepository: JobStatusRepositoryInterface
    ) { }

    async execute(id: number): Promise<void> {
        const jobStatus = await this.statusRepository.findById(id);

        if (!jobStatus) {
            throw new DomainError('Job status not found', 'JOB_STATUS_NOT_FOUND');
        }

        await this.statusRepository.delete(id);
    }
}
