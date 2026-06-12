import type { DashboardJobDto } from "../dtos/DashboardJobDto";

export interface ArchivedJobsDaoInterface {
    getArchivedJobs(filterText?: string): Promise<DashboardJobDto[]>;
}
