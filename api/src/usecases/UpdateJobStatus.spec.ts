import { jest } from '@jest/globals';
import { UpdateJobStatus } from './UpdateJobStatus';
import type { JobStatusRepositoryInterface } from '@/repositories/interfaces/JobStatusRepositoryInterface';
import { JobStatus } from '@/entities/JobStatus';

describe('UpdateJobStatus UseCase', () => {
    let mockRepository: JobStatusRepositoryInterface;
    let useCase: UpdateJobStatus;

    beforeEach(() => {
        mockRepository = {
            findById: jest.fn<JobStatusRepositoryInterface['findById']>().mockResolvedValue(new JobStatus({ id: 1, name: 'Old Name', order: 1 })),
            update: jest.fn<JobStatusRepositoryInterface['update']>().mockResolvedValue(new JobStatus({ id: 1, name: 'New Name', order: 1 }))
        } as unknown as JobStatusRepositoryInterface;
        useCase = new UpdateJobStatus(mockRepository);
    });

    it('should update the JobStatus name and return the updated entity', async () => {
        const result = await useCase.execute(1, { name: 'New Name' });

        expect(mockRepository.findById).toHaveBeenCalledTimes(1);
        expect(mockRepository.findById).toHaveBeenCalledWith(1);

        expect(mockRepository.update).toHaveBeenCalledTimes(1);

        expect(result.id).toBe(1);
        expect(result.name).toBe('New Name');
        expect(result.order).toBe(1);
    });
});
