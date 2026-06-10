import { jest } from '@jest/globals';
import { UpdateJobLink } from "./UpdateJobLink";
import type { JobLinkRepositoryInterface } from "../repositories/interfaces/JobLinkRepositoryInterface";
import { JobLink } from "../entities/JobLink";

describe('UpdateJobLink UseCase', () => {
    let mockJobLinkRepository: jest.Mocked<JobLinkRepositoryInterface>;
    let updateJobLink: UpdateJobLink;
    let existingLink: JobLink;

    beforeEach(() => {
        mockJobLinkRepository = {
            create: jest.fn(),
            createMany: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        updateJobLink = new UpdateJobLink(mockJobLinkRepository);
        existingLink = new JobLink({ id: 1, jobId: 1, title: 'Old', url: 'https://old.com' });
    });

    it('should update a link successfully', async () => {
        mockJobLinkRepository.findById.mockResolvedValue(existingLink);
        const updatedLink = new JobLink({ id: 1, jobId: 1, title: 'New', url: 'https://new.com' });
        mockJobLinkRepository.update.mockResolvedValue(updatedLink);

        const result = await updateJobLink.execute({ jobId: 1, linkId: 1, title: 'New', url: 'https://new.com' });

        expect(mockJobLinkRepository.findById).toHaveBeenCalledWith(1);
        expect(mockJobLinkRepository.update).toHaveBeenCalledWith(expect.any(JobLink));
        expect(result).toEqual({
            id: 1,
            title: 'New',
            url: 'https://new.com'
        });
    });

    it('should throw error if link does not exist', async () => {
        mockJobLinkRepository.findById.mockResolvedValue(null);

        await expect(updateJobLink.execute({ jobId: 1, linkId: 99, title: 'Test' }))
            .rejects.toThrow('Link not found');
    });

    it('should throw error if link does not belong to the job', async () => {
        mockJobLinkRepository.findById.mockResolvedValue(existingLink);

        await expect(updateJobLink.execute({ jobId: 99, linkId: 1, title: 'Test' }))
            .rejects.toThrow('Link does not belong to this job');
    });
});
