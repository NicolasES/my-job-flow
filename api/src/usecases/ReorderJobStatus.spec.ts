import { jest } from '@jest/globals';
import { ReorderJobStatus } from './ReorderJobStatus';
import type { JobStatusRepositoryInterface } from '@/repositories/interfaces/JobStatusRepositoryInterface';

describe('ReorderJobStatus UseCase', () => {
    let mockRepository: JobStatusRepositoryInterface;
    let useCase: ReorderJobStatus;

    beforeEach(() => {
        mockRepository = {
            updateOrders: jest.fn<JobStatusRepositoryInterface['updateOrders']>().mockResolvedValue(undefined)
        } as unknown as JobStatusRepositoryInterface;
        useCase = new ReorderJobStatus(mockRepository);
    });

    it('should pass the items to the repository to update orders', async () => {
        const input = [
            { id: 2, order: 1 },
            { id: 1, order: 2 }
        ];

        await useCase.execute(input);

        expect(mockRepository.updateOrders).toHaveBeenCalledTimes(1);
        expect(mockRepository.updateOrders).toHaveBeenCalledWith(input);
    });
});
