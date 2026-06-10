import { jest } from '@jest/globals';
import { AddJobSkill } from "./AddJobSkill";
import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import type { SkillRepositoryInterface } from "../repositories/interfaces/SkillRepositoryInterface";
import { Job } from "../entities/Job";
import { JobStatus } from "../entities/JobStatus";
import { Skill } from "../entities/Skill";
import { DomainError } from "../errors/DomainError";

describe('AddJobSkill UseCase', () => {
    let mockJobRepository: jest.Mocked<JobRepositoryInterface>;
    let mockSkillRepository: jest.Mocked<SkillRepositoryInterface>;
    let addJobSkill: AddJobSkill;
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
        mockSkillRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            delete: jest.fn()
        };
        addJobSkill = new AddJobSkill(mockJobRepository, mockSkillRepository);

        existingJob = new Job({
            id: 1,
            title: 'Title',
            company: 'Company',
            workModel: 'remote',
            description: 'Desc',
            appliedAt: new Date(),
            status: new JobStatus({ id: 1, name: 'Applied', order: 1 })
        });
    });

    it('should add an existing skill to job', async () => {
        const existingSkill = new Skill({ id: 10, name: 'React' });
        mockJobRepository.findById.mockResolvedValue(existingJob);
        mockSkillRepository.findById.mockResolvedValue(existingSkill);

        await addJobSkill.execute({ jobId: 1, skillId: 10, type: 'mandatory' });

        expect(mockJobRepository.findById).toHaveBeenCalledWith(1);
        expect(mockSkillRepository.findById).toHaveBeenCalledWith(10);
        expect(mockJobRepository.addSkill).toHaveBeenCalledWith(1, 10, 'mandatory');
    });

    it('should throw error if skill does not exist', async () => {
        mockJobRepository.findById.mockResolvedValue(existingJob);
        mockSkillRepository.findById.mockResolvedValue(null);

        await expect(addJobSkill.execute({ jobId: 1, skillId: 99, type: 'recommended' }))
            .rejects.toThrow('Skill not found');
    });

    it('should throw error if job does not exist', async () => {
        mockJobRepository.findById.mockResolvedValue(null);
        await expect(addJobSkill.execute({ jobId: 99, skillId: 10, type: 'mandatory' }))
            .rejects.toThrow(DomainError);
    });
});
