import { jest } from '@jest/globals';
import { AddJobContact } from "./AddJobContact";
import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import type { JobContactRepositoryInterface } from "../repositories/interfaces/JobContactRepositoryInterface";
import { Job } from "../entities/Job";
import { JobStatus } from "../entities/JobStatus";
import { JobContact } from "../entities/JobContact";

describe('AddJobContact UseCase', () => {
    let mockJobRepository: jest.Mocked<JobRepositoryInterface>;
    let mockJobContactRepository: jest.Mocked<JobContactRepositoryInterface>;
    let addJobContact: AddJobContact;
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
        mockJobContactRepository = {
            create: jest.fn(),
            createMany: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        addJobContact = new AddJobContact(mockJobRepository, mockJobContactRepository);

        existingJob = new Job({
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
    });

    it('should add a contact to a job successfully', async () => {
        mockJobRepository.findById.mockResolvedValue(existingJob);
        
        const contact = new JobContact({ id: 10, jobId: 1, name: 'Fulano' });
        mockJobContactRepository.create.mockResolvedValue(contact);

        const result = await addJobContact.execute({ jobId: 1, name: 'Fulano' });

        expect(mockJobRepository.findById).toHaveBeenCalledWith(1);
        expect(mockJobContactRepository.create).toHaveBeenCalledWith(expect.any(JobContact));
        expect(result).toEqual({
            id: 10,
            name: 'Fulano',
            role: null,
            linkedin: null,
            phone: null
        });
    });

    it('should throw error if job does not exist', async () => {
        mockJobRepository.findById.mockResolvedValue(null);

        await expect(addJobContact.execute({ jobId: 99, name: 'Fulano' })).rejects.toThrow('Job not found');
    });
});
