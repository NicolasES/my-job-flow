import { jest } from '@jest/globals';
import { CreateJobStatus } from './CreateJobStatus';
import type { JobStatusRepositoryInterface } from '@/repositories/interfaces/JobStatusRepositoryInterface';
import { JobStatus } from '@/entities/JobStatus';

describe('CreateJobStatus UseCase', () => {
    let mockRepository: jest.Mocked<JobStatusRepositoryInterface>;
    let useCase: CreateJobStatus;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn<JobStatusRepositoryInterface['create']>().mockImplementation(async (jobStatus: JobStatus) => {
                return new JobStatus({ id: 99, name: jobStatus.getName(), order: jobStatus.getOrder() });
            }),
        } as jest.Mocked<JobStatusRepositoryInterface>;
        useCase = new CreateJobStatus(mockRepository);
    });

    it('should successfully create the JobStatus in the repository and return the correct data', async () => {
        const input = { name: 'In Progress', order: 2 };

        const result = await useCase.execute(input);

        expect(mockRepository.create).toHaveBeenCalledTimes(1);
        expect(result.id).toBe(99);
        expect(result.name).toBe('In Progress');
        expect(result.order).toBe(2);
    });
});
