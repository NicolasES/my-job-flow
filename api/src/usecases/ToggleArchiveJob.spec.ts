import { ToggleArchiveJob } from "./ToggleArchiveJob";
import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import { Job } from "@/entities/Job";
import { JobStatus } from "@/entities/JobStatus";
import { DomainError } from "@/errors/DomainError";
import { jest } from '@jest/globals';

describe('ToggleArchiveJob UseCase', () => {
    let jobRepository: jest.Mocked<JobRepositoryInterface>;
    let toggleArchiveJob: ToggleArchiveJob;
    let mockJob: Job;

    beforeEach(() => {
        jobRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            associateSkills: jest.fn(),
            addSkill: jest.fn(),
            removeSkill: jest.fn()
        };

        toggleArchiveJob = new ToggleArchiveJob(jobRepository);

        mockJob = new Job({
            id: 1,
            title: 'Frontend Dev',
            company: 'Tech Corp',
            workModel: 'remote',
            description: 'Vaga maneira',
            appliedAt: new Date(),
            status: new JobStatus({ id: 1, name: 'Triagem', order: 0 })
        });
    });

    it('should successfully archive a job', async () => {
        jobRepository.findById.mockResolvedValue(mockJob);

        await toggleArchiveJob.execute(1, true);

        expect(jobRepository.findById).toHaveBeenCalledWith(1);
        expect(mockJob.getIsArchived()).toBe(true);
        expect(jobRepository.update).toHaveBeenCalledWith(mockJob);
    });

    it('should successfully unarchive a job', async () => {
        mockJob.archive();
        jobRepository.findById.mockResolvedValue(mockJob);

        await toggleArchiveJob.execute(1, false);

        expect(jobRepository.findById).toHaveBeenCalledWith(1);
        expect(mockJob.getIsArchived()).toBe(false);
        expect(jobRepository.update).toHaveBeenCalledWith(mockJob);
    });

    it('should throw DomainError if job does not exist', async () => {
        jobRepository.findById.mockResolvedValue(null);

        await expect(toggleArchiveJob.execute(999, true)).rejects.toThrow(DomainError);
        await expect(toggleArchiveJob.execute(999, true)).rejects.toThrow("Job not found");

        expect(jobRepository.findById).toHaveBeenCalledWith(999);
        expect(jobRepository.update).not.toHaveBeenCalled();
    });
});
