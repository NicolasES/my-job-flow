import type { JobStatus } from "@/entities/JobStatus";

export interface JobStatusRepositoryInterface {
    create(jobStatus: JobStatus): Promise<JobStatus>
    findAll(): Promise<JobStatus[]>
    findById(id: number): Promise<JobStatus | null>
    updateOrders(items: { id: number, order: number }[]): Promise<void>
    update(jobStatus: JobStatus): Promise<JobStatus>
    delete(id: number): Promise<void>
}
