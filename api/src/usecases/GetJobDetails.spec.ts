import { GetJobDetails } from "./GetJobDetails";
import type { JobDetailsDaoInterface } from "@/daos/interfaces/JobDetailsDaoInterface";
import type { JobDetailsDto } from "@/daos/dtos/JobDetailsDto";
import { jest } from '@jest/globals';

describe('GetJobDetails UseCase', () => {
    let jobDetailsDao: jest.Mocked<JobDetailsDaoInterface>;
    let getJobDetails: GetJobDetails;

    beforeEach(() => {
        jobDetailsDao = {
            getJobDetails: jest.fn()
        };
        getJobDetails = new GetJobDetails(jobDetailsDao);
    });

    it('should return job details when job exists', async () => {
        const mockDto: JobDetailsDto = {
            id: 1,
            title: 'Test',
            company: 'Test Co',
            workModel: 'remote',
            salary: 1000,
            description: 'Desc',
            appliedAt: new Date(),
            createdAt: new Date(),
            status: { id: 1, name: 'Triagem', order: 0 },
            contacts: [],
            links: [],
            comments: [],
            mandatorySkills: [],
            recommendedSkills: []
        };

        jobDetailsDao.getJobDetails.mockResolvedValue(mockDto);

        const result = await getJobDetails.execute(1);

        expect(jobDetailsDao.getJobDetails).toHaveBeenCalledWith(1);
        expect(result).toEqual(mockDto);
    });

    it('should throw DomainError when job is not found', async () => {
        jobDetailsDao.getJobDetails.mockResolvedValue(null);

        await expect(getJobDetails.execute(999)).rejects.toThrow('Job not found');
    });
});
