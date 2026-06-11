import type { DashboardColumnDto } from "../dtos/DashboardJobDto";

export interface DashboardDaoInterface {
    getDashboardJobs(filterText?: string): Promise<DashboardColumnDto[]>;
}
