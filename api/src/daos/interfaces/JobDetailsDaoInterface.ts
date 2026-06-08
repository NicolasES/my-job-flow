import type { JobDetailsDto } from "@/daos/dtos/JobDetailsDto";

export interface JobDetailsDaoInterface {
    getJobDetails(jobId: number): Promise<JobDetailsDto | null>;
}
