import type { JobStatusRepositoryInterface } from "@/repositories/interfaces/JobStatusRepositoryInterface";

export class ReorderJobStatus {
    constructor(
        private readonly statusRepository: JobStatusRepositoryInterface
    ) { }

    async execute(items: ReorderJobStatusInput): Promise<void> {
        await this.statusRepository.updateOrders(items)
    }
}

export type ReorderJobStatusInput = {
    id: number
    order: number
}[]
