import { jest } from '@jest/globals';
import { DeleteJobContact } from "./DeleteJobContact";
import type { JobContactRepositoryInterface } from "../repositories/interfaces/JobContactRepositoryInterface";
import { JobContact } from "../entities/JobContact";

describe('DeleteJobContact UseCase', () => {
    let mockJobContactRepository: jest.Mocked<JobContactRepositoryInterface>;
    let deleteJobContact: DeleteJobContact;
    let existingContact: JobContact;

    beforeEach(() => {
        mockJobContactRepository = {
            create: jest.fn(),
            createMany: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        deleteJobContact = new DeleteJobContact(mockJobContactRepository);
        existingContact = new JobContact({ id: 1, jobId: 1, name: 'Name' });
    });

    it('should delete a contact successfully', async () => {
        mockJobContactRepository.findById.mockResolvedValue(existingContact);

        await deleteJobContact.execute({ jobId: 1, contactId: 1 });

        expect(mockJobContactRepository.findById).toHaveBeenCalledWith(1);
        expect(mockJobContactRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw error if contact does not exist', async () => {
        mockJobContactRepository.findById.mockResolvedValue(null);

        await expect(deleteJobContact.execute({ jobId: 1, contactId: 99 }))
            .rejects.toThrow('Contact not found');
    });

    it('should throw error if contact does not belong to the job', async () => {
        mockJobContactRepository.findById.mockResolvedValue(existingContact);

        await expect(deleteJobContact.execute({ jobId: 99, contactId: 1 }))
            .rejects.toThrow('Contact does not belong to this job');
    });
});
