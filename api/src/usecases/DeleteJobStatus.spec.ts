import { jest } from '@jest/globals';
import { DeleteJobStatus } from "./DeleteJobStatus";
import type { JobStatusRepositoryInterface } from "../repositories/interfaces/JobStatusRepositoryInterface";
import { JobStatus } from "../entities/JobStatus";

describe('DeleteJobStatus UseCase', () => {
    let mockJobStatusRepository: jest.Mocked<JobStatusRepositoryInterface>;
    let deleteJobStatus: DeleteJobStatus;

    beforeEach(() => {
        mockJobStatusRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findInitialStatus: jest.fn(),
            updateOrders: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        deleteJobStatus = new DeleteJobStatus(mockJobStatusRepository);
    });

    it('should delete a JobStatus successfully', async () => {
        const existingStatus = new JobStatus({ id: 1, name: 'Triagem', order: 1 });
        mockJobStatusRepository.findById.mockResolvedValue(existingStatus);

        await deleteJobStatus.execute(1);

        expect(mockJobStatusRepository.findById).toHaveBeenCalledWith(1);
        expect(mockJobStatusRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the JobStatus does not exist', async () => {
        mockJobStatusRepository.findById.mockResolvedValue(null);

        await expect(deleteJobStatus.execute(999)).rejects.toThrow('Job status not found');

        expect(mockJobStatusRepository.findById).toHaveBeenCalledWith(999);
        expect(mockJobStatusRepository.delete).not.toHaveBeenCalled();
    });
});
