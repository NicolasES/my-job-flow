import type { JobStatus } from "@/entities/JobStatus";

export interface JobStatusRepositoryInterface {
    create(jobStatus: JobStatus): Promise<JobStatus>
    findAll(): Promise<JobStatus[]>
    updateOrders(items: { id: number, order: number }[]): Promise<void>
}
