import type { ArchivedJobsDaoInterface } from "../daos/interfaces/ArchivedJobsDaoInterface";
import type { DashboardJobDto } from "../daos/dtos/DashboardJobDto";

export class GetArchivedJobs {
    constructor(
        private archivedJobsDao: ArchivedJobsDaoInterface
    ) {}

    async execute(filterText?: string): Promise<DashboardJobDto[]> {
        return this.archivedJobsDao.getArchivedJobs(filterText);
    }
}
