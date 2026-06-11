import { jest } from '@jest/globals';
import { AddJobComment } from "./AddJobComment";
import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import type { JobCommentRepositoryInterface } from "../repositories/interfaces/JobCommentRepositoryInterface";
import { Job } from "../entities/Job";
import { JobStatus } from "../entities/JobStatus";
import { JobComment } from "../entities/JobComment";

describe('AddJobComment UseCase', () => {
    let mockJobRepository: jest.Mocked<JobRepositoryInterface>;
    let mockJobCommentRepository: jest.Mocked<JobCommentRepositoryInterface>;
    let addJobComment: AddJobComment;

    beforeEach(() => {
        mockJobRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            associateSkills: jest.fn(),
            addSkill: jest.fn(),
            removeSkill: jest.fn()
        };
        mockJobCommentRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        addJobComment = new AddJobComment(mockJobRepository, mockJobCommentRepository);
    });

    it('should add a comment to a job successfully', async () => {
        const existingJob = new Job({
            id: 1,
            title: 'Frontend',
            company: 'Tech',
            workModel: 'remote',
            salary: 5000,
            description: 'Test',
            appliedAt: new Date(),
            createdAt: new Date(),
            status: new JobStatus({ id: 1, name: 'Applied', order: 1 })
        });

        mockJobRepository.findById.mockResolvedValue(existingJob);
        
        const date = new Date();
        const comment = new JobComment({ id: 10, jobId: 1, text: 'Gostei muito da vaga', date });
        mockJobCommentRepository.create.mockResolvedValue(comment);

        const result = await addJobComment.execute({ jobId: 1, text: 'Gostei muito da vaga' });

        expect(mockJobRepository.findById).toHaveBeenCalledWith(1);
        expect(mockJobCommentRepository.create).toHaveBeenCalledWith(expect.any(JobComment));
        expect(result).toEqual({
            id: 10,
            text: 'Gostei muito da vaga',
            date: date
        });
    });

    it('should throw error if job does not exist', async () => {
        mockJobRepository.findById.mockResolvedValue(null);

        await expect(addJobComment.execute({ jobId: 99, text: 'Test' })).rejects.toThrow('Job not found');
    });
});
