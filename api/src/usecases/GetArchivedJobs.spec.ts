import { GetArchivedJobs } from "./GetArchivedJobs";
import type { ArchivedJobsDaoInterface } from "@/daos/interfaces/ArchivedJobsDaoInterface";
import type { DashboardJobDto } from "@/daos/dtos/DashboardJobDto";
import { jest } from '@jest/globals';

describe('GetArchivedJobs UseCase', () => {
    let archivedJobsDao: jest.Mocked<ArchivedJobsDaoInterface>;
    let getArchivedJobs: GetArchivedJobs;

    beforeEach(() => {
        archivedJobsDao = {
            getArchivedJobs: jest.fn()
        };
        getArchivedJobs = new GetArchivedJobs(archivedJobsDao);
    });

    it('should call getArchivedJobs on DAO with correct parameters and return its result', async () => {
        const mockResult: DashboardJobDto[] = [
            { id: 1, title: 'Job 1', company: 'Co 1', location: 'Remote', date: '15 out', statusId: 1 }
        ];

        archivedJobsDao.getArchivedJobs.mockResolvedValue(mockResult);

        const result = await getArchivedJobs.execute('filter');

        expect(archivedJobsDao.getArchivedJobs).toHaveBeenCalledWith('filter');
        expect(result).toEqual(mockResult);
    });

    it('should call getArchivedJobs on DAO without parameters when no filter is provided', async () => {
        const mockResult: DashboardJobDto[] = [];

        archivedJobsDao.getArchivedJobs.mockResolvedValue(mockResult);

        const result = await getArchivedJobs.execute();

        expect(archivedJobsDao.getArchivedJobs).toHaveBeenCalledWith(undefined);
        expect(result).toEqual(mockResult);
    });
});
