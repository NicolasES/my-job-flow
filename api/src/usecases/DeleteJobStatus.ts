import type { JobStatusRepositoryInterface } from "@/repositories/interfaces/JobStatusRepositoryInterface";

export class DeleteJobStatus {
    constructor(
        private readonly statusRepository: JobStatusRepositoryInterface
    ) { }

    async execute(id: number): Promise<void> {
        const jobStatus = await this.statusRepository.findById(id);

        if (!jobStatus) {
            throw new Error('JobStatus não encontrado');
        }

        await this.statusRepository.delete(id);
    }
}
