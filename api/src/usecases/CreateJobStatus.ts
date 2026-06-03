import { JobStatus } from "@/entities/JobStatus";
import type { JobStatusRepositoryInterface } from "@/repositories/interfaces/JobStatusRepositoryInterface";

export class CreateJobStatus {
    constructor(
        private readonly statusRepository: JobStatusRepositoryInterface
    ) { }

    async execute({ name, order }: CreateJobStatusInput): Promise<CreateJobStatusOutput> {
        const jobStatus = new JobStatus({ name, order })
        const createdJobStatus = await this.statusRepository.create(jobStatus)
        return {
            id: createdJobStatus.getId()!,
            name: createdJobStatus.getName(),
            order: createdJobStatus.getOrder(),
            createAt: createdJobStatus.getCreateAt()
        }
    }
}

export type CreateJobStatusInput = {
    name: string
    order: number
}

export type CreateJobStatusOutput = {
    id: number
    name: string
    order: number
    createAt: Date
}