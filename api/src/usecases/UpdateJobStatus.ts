import type { JobStatusRepositoryInterface } from "@/repositories/interfaces/JobStatusRepositoryInterface";

export class UpdateJobStatus {
    constructor(
        private readonly statusRepository: JobStatusRepositoryInterface
    ) { }

    async execute(id: number, data: UpdateJobStatusInput): Promise<UpdateJobStatusOutput> {
        const jobStatus = await this.statusRepository.findById(id);
        if (!jobStatus) {
            throw new Error('JobStatus não encontrado');
        }
        jobStatus.setName(data.name);
        const updated = await this.statusRepository.update(jobStatus);

        return {
            id: updated.getId()!,
            name: updated.getName(),
            order: updated.getOrder(),
            createAt: updated.getCreateAt()
        };
    }
}

export type UpdateJobStatusInput = {
    name: string
}

export type UpdateJobStatusOutput = {
    id: number
    name: string
    order: number
    createAt: Date
}
