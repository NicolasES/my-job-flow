import { jest } from '@jest/globals';
import { UpdateJobContact } from "./UpdateJobContact";
import type { JobContactRepositoryInterface } from "../repositories/interfaces/JobContactRepositoryInterface";
import { JobContact } from "../entities/JobContact";

describe('UpdateJobContact UseCase', () => {
    let mockJobContactRepository: jest.Mocked<JobContactRepositoryInterface>;
    let updateJobContact: UpdateJobContact;
    let existingContact: JobContact;

    beforeEach(() => {
        mockJobContactRepository = {
            create: jest.fn(),
            createMany: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        updateJobContact = new UpdateJobContact(mockJobContactRepository);
        existingContact = new JobContact({ id: 1, jobId: 1, name: 'Old Name' });
    });

    it('should update a contact successfully', async () => {
        mockJobContactRepository.findById.mockResolvedValue(existingContact);
        const updatedContact = new JobContact({ id: 1, jobId: 1, name: 'New Name' });
        mockJobContactRepository.update.mockResolvedValue(updatedContact);

        const result = await updateJobContact.execute({ jobId: 1, contactId: 1, name: 'New Name' });

        expect(mockJobContactRepository.findById).toHaveBeenCalledWith(1);
        expect(mockJobContactRepository.update).toHaveBeenCalledWith(expect.any(JobContact));
        expect(result).toEqual({
            id: 1,
            name: 'New Name',
            role: null,
            linkedin: null,
            phone: null
        });
    });

    it('should throw error if contact does not exist', async () => {
        mockJobContactRepository.findById.mockResolvedValue(null);

        await expect(updateJobContact.execute({ jobId: 1, contactId: 99, name: 'Name' }))
            .rejects.toThrow('Contact not found');
    });

    it('should throw error if contact does not belong to the job', async () => {
        mockJobContactRepository.findById.mockResolvedValue(existingContact);

        await expect(updateJobContact.execute({ jobId: 99, contactId: 1, name: 'Name' }))
            .rejects.toThrow('Contact does not belong to this job');
    });
});
