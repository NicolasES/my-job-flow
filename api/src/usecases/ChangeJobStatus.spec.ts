import { jest } from '@jest/globals';
import { ChangeJobStatus } from "./ChangeJobStatus";
import { Job } from "../entities/Job";
import { JobStatus } from "../entities/JobStatus";
import { DomainError } from "../errors/DomainError";

describe('ChangeJobStatus UseCase', () => {
    let changeJobStatus: ChangeJobStatus;
    let mockJobRepository: any;
    let mockJobStatusRepository: any;

    beforeEach(() => {
        mockJobRepository = {
            findById: jest.fn(),
            update: jest.fn()
        };
        mockJobStatusRepository = {
            findById: jest.fn()
        };
        changeJobStatus = new ChangeJobStatus(mockJobRepository, mockJobStatusRepository);
    });

    it('should change job status successfully', async () => {
        const oldStatus = new JobStatus({ id: 1, name: 'Applied', order: 1 });
        const newStatus = new JobStatus({ id: 2, name: 'Interview', order: 2 });
        const job = new Job({
            id: 1,
            title: 'Dev',
            company: 'Tech',
            description: '',
            appliedAt: new Date(),
            workModel: 'remote',
            status: oldStatus
        });

        mockJobRepository.findById.mockResolvedValue(job);
        mockJobStatusRepository.findById.mockResolvedValue(newStatus);

        await changeJobStatus.execute({ jobId: 1, statusId: 2 });

        expect(mockJobRepository.update).toHaveBeenCalledWith(job);
        expect(job.getStatus().getId()).toBe(2);
    });

    it('should throw error if job does not exist', async () => {
        mockJobRepository.findById.mockResolvedValue(null);

        await expect(changeJobStatus.execute({ jobId: 1, statusId: 2 }))
            .rejects.toThrow(DomainError);
    });

    it('should throw error if status does not exist', async () => {
        const oldStatus = new JobStatus({ id: 1, name: 'Applied', order: 1 });
        const job = new Job({
            id: 1,
            title: 'Dev',
            company: 'Tech',
            description: '',
            appliedAt: new Date(),
            workModel: 'remote',
            status: oldStatus
        });
        mockJobRepository.findById.mockResolvedValue(job);
        mockJobStatusRepository.findById.mockResolvedValue(null);

        await expect(changeJobStatus.execute({ jobId: 1, statusId: 2 }))
            .rejects.toThrow(DomainError);
    });
});
