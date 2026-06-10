import { jest } from '@jest/globals';
import { AddJobLink } from "./AddJobLink";
import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import type { JobLinkRepositoryInterface } from "../repositories/interfaces/JobLinkRepositoryInterface";
import { Job } from "../entities/Job";
import { JobStatus } from "../entities/JobStatus";
import { JobLink } from "../entities/JobLink";

describe('AddJobLink UseCase', () => {
    let mockJobRepository: jest.Mocked<JobRepositoryInterface>;
    let mockJobLinkRepository: jest.Mocked<JobLinkRepositoryInterface>;
    let addJobLink: AddJobLink;
    let existingJob: Job;

    beforeEach(() => {
        mockJobRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            associateSkills: jest.fn(),
            addSkill: jest.fn(),
            removeSkill: jest.fn()
        };
        mockJobLinkRepository = {
            create: jest.fn(),
            createMany: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        addJobLink = new AddJobLink(mockJobRepository, mockJobLinkRepository);

        existingJob = new Job({
            id: 1,
            title: 'Frontend',
            company: 'Tech',
            description: '',
            appliedAt: new Date(),
            workModel: 'remote',
            status: new JobStatus({ id: 1, name: 'Applied', order: 1 })
        });
    });

    it('should add a link to a job successfully', async () => {
        mockJobRepository.findById.mockResolvedValue(existingJob);
        
        const link = new JobLink({ id: 10, jobId: 1, title: 'Portfolio', url: 'https://portfolio.com' });
        mockJobLinkRepository.create.mockResolvedValue(link);

        const result = await addJobLink.execute({ jobId: 1, title: 'Portfolio', url: 'https://portfolio.com' });

        expect(mockJobRepository.findById).toHaveBeenCalledWith(1);
        expect(mockJobLinkRepository.create).toHaveBeenCalledWith(expect.any(JobLink));
        expect(result).toEqual({
            id: 10,
            title: 'Portfolio',
            url: 'https://portfolio.com'
        });
    });

    it('should throw error if job does not exist', async () => {
        mockJobRepository.findById.mockResolvedValue(null);

        await expect(addJobLink.execute({ jobId: 99, title: 'Test', url: 'https://test.com' }))
            .rejects.toThrow('Job not found');
    });
});
