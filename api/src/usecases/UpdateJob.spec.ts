import { jest } from '@jest/globals';
import { UpdateJob } from "./UpdateJob";
import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import { Job } from "../entities/Job";
import { JobStatus } from "../entities/JobStatus";
import { DomainError } from "../errors/DomainError";

describe('UpdateJob UseCase', () => {
    let mockJobRepository: jest.Mocked<JobRepositoryInterface>;
    let updateJob: UpdateJob;
    let existingJob: Job;

    beforeEach(() => {
        mockJobRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            associateSkills: jest.fn()
        };
        updateJob = new UpdateJob(mockJobRepository);

        existingJob = new Job({
            id: 1,
            title: 'Old Title',
            company: 'Old Company',
            workModel: 'remote',
            salary: 5000,
            description: 'Old Description',
            appliedAt: new Date('2024-01-01'),
            status: new JobStatus({ id: 1, name: 'Applied', order: 1 })
        });
    });

    it('should update a job successfully', async () => {
        mockJobRepository.findById.mockResolvedValue(existingJob);
        mockJobRepository.update.mockImplementation(async (job) => job);

        const newDate = new Date('2024-02-01');
        const updatedJob = await updateJob.execute(1, {
            title: 'New Title',
            company: 'New Company',
            workModel: 'hybrid',
            salary: 6000,
            description: 'New Description',
            appliedAt: newDate
        });

        expect(mockJobRepository.findById).toHaveBeenCalledWith(1);
        expect(mockJobRepository.update).toHaveBeenCalledWith(expect.any(Job));
        
        expect(updatedJob.getTitle()).toBe('New Title');
        expect(updatedJob.getCompany()).toBe('New Company');
        expect(updatedJob.getWorkModel()).toBe('hybrid');
        expect(updatedJob.getSalary()).toBe(6000);
        expect(updatedJob.getDescription()).toBe('New Description');
        expect(updatedJob.getAppliedAt()).toBe(newDate);
    });

    it('should throw an error if the job does not exist', async () => {
        mockJobRepository.findById.mockResolvedValue(null);

        await expect(updateJob.execute(999, {
            title: 'New Title',
            company: 'New Company',
            workModel: 'hybrid',
            salary: 6000,
            description: 'New Description',
            appliedAt: new Date()
        })).rejects.toThrow(DomainError);

        expect(mockJobRepository.update).not.toHaveBeenCalled();
    });
});
