import { jest } from '@jest/globals';
import { UpdateJobComment } from "./UpdateJobComment";
import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import type { JobCommentRepositoryInterface } from "../repositories/interfaces/JobCommentRepositoryInterface";
import { Job } from "../entities/Job";
import { JobStatus } from "../entities/JobStatus";
import { JobComment } from "../entities/JobComment";

describe('UpdateJobComment UseCase', () => {
    let mockJobRepository: jest.Mocked<JobRepositoryInterface>;
    let mockJobCommentRepository: jest.Mocked<JobCommentRepositoryInterface>;
    let updateJobComment: UpdateJobComment;

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
        updateJobComment = new UpdateJobComment(mockJobRepository, mockJobCommentRepository);
    });

    it('should update a comment successfully', async () => {
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

        const existingComment = new JobComment({ id: 10, jobId: 1, text: 'Old text', date: new Date() });

        mockJobRepository.findById.mockResolvedValue(existingJob);
        mockJobCommentRepository.findById.mockResolvedValue(existingComment);
        mockJobCommentRepository.update.mockResolvedValue();

        await updateJobComment.execute({ jobId: 1, commentId: 10, text: 'New text' });

        expect(mockJobCommentRepository.update).toHaveBeenCalledWith(expect.any(JobComment));
        expect(existingComment.getText()).toBe('New text');
    });

    it('should throw error if job does not exist', async () => {
        mockJobRepository.findById.mockResolvedValue(null);

        await expect(updateJobComment.execute({ jobId: 99, commentId: 10, text: 'New text' })).rejects.toThrow('Job not found');
    });

    it('should throw error if comment does not exist', async () => {
        mockJobRepository.findById.mockResolvedValue({} as Job);
        mockJobCommentRepository.findById.mockResolvedValue(null);

        await expect(updateJobComment.execute({ jobId: 1, commentId: 99, text: 'New text' })).rejects.toThrow('Comment not found');
    });

    it('should throw error if comment does not belong to job', async () => {
        const existingJob = new Job({
            id: 1,
            title: 'Frontend',
            company: 'Tech',
            description: 'Test',
            appliedAt: new Date(),
            workModel: 'remote',
            status: new JobStatus({ id: 1, name: 'Applied', order: 1 })
        });
        const existingComment = new JobComment({ id: 10, jobId: 2, text: 'Old text', date: new Date() });

        mockJobRepository.findById.mockResolvedValue(existingJob);
        mockJobCommentRepository.findById.mockResolvedValue(existingComment);

        await expect(updateJobComment.execute({ jobId: 1, commentId: 10, text: 'New text' })).rejects.toThrow('Comment does not belong to this job');
    });
});
