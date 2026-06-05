import type { JobStatusRepositoryInterface } from "@/repositories/interfaces/JobStatusRepositoryInterface";

export class FindAllJobStatus {
    constructor(
        private readonly statusRepository: JobStatusRepositoryInterface
    ) { }

    async execute(): Promise<FindAllJobStatusOutput> {
        const statuses = await this.statusRepository.findAll()

        return statuses.map(status => ({
            id: status.getId()!,
            name: status.getName(),
            order: status.getOrder(),
            createAt: status.getCreateAt()
        }))
    }
}

export type FindAllJobStatusOutput = {
    id: number
    name: string
    order: number
    createAt: Date
}[]
