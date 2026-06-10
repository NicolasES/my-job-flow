import { jest } from '@jest/globals';
import { DeleteJobLink } from "./DeleteJobLink";
import type { JobLinkRepositoryInterface } from "../repositories/interfaces/JobLinkRepositoryInterface";
import { JobLink } from "../entities/JobLink";

describe('DeleteJobLink UseCase', () => {
    let mockJobLinkRepository: jest.Mocked<JobLinkRepositoryInterface>;
    let deleteJobLink: DeleteJobLink;
    let existingLink: JobLink;

    beforeEach(() => {
        mockJobLinkRepository = {
            create: jest.fn(),
            createMany: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        deleteJobLink = new DeleteJobLink(mockJobLinkRepository);
        existingLink = new JobLink({ id: 1, jobId: 1, title: 'Test', url: 'https://test.com' });
    });

    it('should delete a link successfully', async () => {
        mockJobLinkRepository.findById.mockResolvedValue(existingLink);

        await deleteJobLink.execute({ jobId: 1, linkId: 1 });

        expect(mockJobLinkRepository.findById).toHaveBeenCalledWith(1);
        expect(mockJobLinkRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw error if link does not exist', async () => {
        mockJobLinkRepository.findById.mockResolvedValue(null);

        await expect(deleteJobLink.execute({ jobId: 1, linkId: 99 }))
            .rejects.toThrow('Link not found');
    });

    it('should throw error if link does not belong to the job', async () => {
        mockJobLinkRepository.findById.mockResolvedValue(existingLink);

        await expect(deleteJobLink.execute({ jobId: 99, linkId: 1 }))
            .rejects.toThrow('Link does not belong to this job');
    });
});
