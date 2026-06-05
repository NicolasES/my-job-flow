import { jest } from '@jest/globals';
import { FindAllJobStatus } from './FindAllJobStatus';
import type { JobStatusRepositoryInterface } from '@/repositories/interfaces/JobStatusRepositoryInterface';
import { JobStatus } from '@/entities/JobStatus';

describe('FindAllJobStatus UseCase', () => {
    let mockRepository: JobStatusRepositoryInterface;
    let useCase: FindAllJobStatus;

    beforeEach(() => {
        mockRepository = {
            findAll: jest.fn<JobStatusRepositoryInterface['findAll']>().mockResolvedValue([
                new JobStatus({ id: 1, name: 'To Do', order: 1 }),
                new JobStatus({ id: 2, name: 'In Progress', order: 2 })
            ])
        } as unknown as JobStatusRepositoryInterface;
        useCase = new FindAllJobStatus(mockRepository);
    });

    it('should return all JobStatus entities from the repository mapped as output DTOs', async () => {
        const result = await useCase.execute();

        expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(2);

        expect(result[0]?.id).toBe(1);
        expect(result[0]?.name).toBe('To Do');
        expect(result[0]?.order).toBe(1);
        expect(result[0]?.createAt).toBeInstanceOf(Date);

        expect(result[1]?.id).toBe(2);
        expect(result[1]?.name).toBe('In Progress');
        expect(result[1]?.order).toBe(2);
        expect(result[1]?.createAt).toBeInstanceOf(Date);
    });
});
