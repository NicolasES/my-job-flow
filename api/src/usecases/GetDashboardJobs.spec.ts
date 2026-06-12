import { GetDashboardJobs } from "./GetDashboardJobs";
import type { DashboardDaoInterface } from "@/daos/interfaces/DashboardDaoInterface";
import type { DashboardColumnDto } from "@/daos/dtos/DashboardJobDto";
import { jest } from '@jest/globals';

describe('GetDashboardJobs UseCase', () => {
    let dashboardDao: jest.Mocked<DashboardDaoInterface>;
    let getDashboardJobs: GetDashboardJobs;

    beforeEach(() => {
        dashboardDao = {
            getDashboardJobs: jest.fn()
        };
        getDashboardJobs = new GetDashboardJobs(dashboardDao);
    });

    it('should call getDashboardJobs on DAO with correct parameters and return its result', async () => {
        const mockResult: DashboardColumnDto[] = [
            {
                id: 1,
                name: 'Enviado',
                order: 1,
                jobs: [
                    { id: 1, title: 'Job 1', company: 'Co 1', location: 'Remote', date: '15 out', statusId: 1 }
                ]
            }
        ];

        dashboardDao.getDashboardJobs.mockResolvedValue(mockResult);

        const result = await getDashboardJobs.execute('filter');

        expect(dashboardDao.getDashboardJobs).toHaveBeenCalledWith('filter');
        expect(result).toEqual(mockResult);
    });

    it('should call getDashboardJobs on DAO without parameters when no filter is provided', async () => {
        const mockResult: DashboardColumnDto[] = [];

        dashboardDao.getDashboardJobs.mockResolvedValue(mockResult);

        const result = await getDashboardJobs.execute();

        expect(dashboardDao.getDashboardJobs).toHaveBeenCalledWith(undefined);
        expect(result).toEqual(mockResult);
    });
});
