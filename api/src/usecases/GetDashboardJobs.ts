import type { DashboardDaoInterface } from "../daos/interfaces/DashboardDaoInterface";
import type { DashboardColumnDto } from "../daos/dtos/DashboardJobDto";

export class GetDashboardJobs {
    constructor(private readonly dashboardDao: DashboardDaoInterface) {}

    async execute(filterText?: string): Promise<DashboardColumnDto[]> {
        return this.dashboardDao.getDashboardJobs(filterText);
    }
}
