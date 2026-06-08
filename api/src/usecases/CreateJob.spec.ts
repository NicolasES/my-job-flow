import { CreateJob } from "./CreateJob";
import type { JobRepositoryInterface } from "@/repositories/interfaces/JobRepositoryInterface";
import type { JobStatusRepositoryInterface } from "@/repositories/interfaces/JobStatusRepositoryInterface";
import type { SkillRepositoryInterface } from "@/repositories/interfaces/SkillRepositoryInterface";
import type { JobContactRepositoryInterface } from "@/repositories/interfaces/JobContactRepositoryInterface";
import type { JobLinkRepositoryInterface } from "@/repositories/interfaces/JobLinkRepositoryInterface";
import type { UnitOfWork, UnitOfWorkRepositories } from "@/repositories/interfaces/UnitOfWork";
import { JobStatus } from "@/entities/JobStatus";
import { Skill } from "@/entities/Skill";
import { Job } from "@/entities/Job";
import { jest } from '@jest/globals';

describe('CreateJob UseCase', () => {
    let unitOfWork: jest.Mocked<UnitOfWork>;
    let jobRepository: jest.Mocked<JobRepositoryInterface>;
    let jobContactRepository: jest.Mocked<JobContactRepositoryInterface>;
    let jobLinkRepository: jest.Mocked<JobLinkRepositoryInterface>;
    let jobStatusRepository: jest.Mocked<JobStatusRepositoryInterface>;
    let skillRepository: jest.Mocked<SkillRepositoryInterface>;
    let createJob: CreateJob;

    beforeEach(() => {
        jobRepository = {
            create: jest.fn(),
            associateSkills: jest.fn()
        } as unknown as jest.Mocked<JobRepositoryInterface>;

        jobContactRepository = {
            createMany: jest.fn()
        };

        jobLinkRepository = {
            createMany: jest.fn()
        };

        unitOfWork = {
            execute: jest.fn().mockImplementation(async (work: any) => {
                return await work({
                    jobRepository,
                    jobContactRepository,
                    jobLinkRepository
                });
            }) as any
        };

        jobStatusRepository = {
            findById: jest.fn(),
            findInitialStatus: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
            updateOrders: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };

        skillRepository = {
            findById: jest.fn(),
            findByName: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
            delete: jest.fn()
        };

        createJob = new CreateJob(unitOfWork, jobStatusRepository, skillRepository);
    });

    it('should successfully create a job with all relations via UoW', async () => {
        const mockStatus = new JobStatus({ id: 1, name: 'Triagem', order: 0 });
        const mockSkill = new Skill({ id: 10, name: 'React' });

        jobStatusRepository.findInitialStatus.mockResolvedValue(mockStatus);
        skillRepository.findById.mockResolvedValue(mockSkill);

        jobRepository.create.mockResolvedValue(new Job({
            id: 99,
            title: 'Frontend Developer',
            company: 'Tech Corp',
            workModel: 'remote',
            salary: 5000,
            description: 'A great job',
            appliedAt: new Date('2024-01-01'),
            status: mockStatus
        }));

        const result = await createJob.execute({
            title: 'Frontend Developer',
            company: 'Tech Corp',
            workModel: 'remote',
            salary: 5000,
            description: 'A great job',
            appliedAt: new Date('2024-01-01'),
            contacts: [{ name: 'John', role: 'HR', linkedin: 'url', phone: '123' }],
            links: [{ title: 'GitHub', url: 'https://github.com' }],
            mandatorySkillsIds: [10],
            recommendedSkillsIds: [10]
        });

        expect(jobStatusRepository.findInitialStatus).toHaveBeenCalled();
        expect(skillRepository.findById).toHaveBeenCalledWith(10);
        expect(jobRepository.create).toHaveBeenCalled();
        expect(jobContactRepository.createMany).toHaveBeenCalled();
        expect(jobLinkRepository.createMany).toHaveBeenCalled();
        expect(jobRepository.associateSkills).toHaveBeenCalledWith(99, [10], [10]);
        expect(result.id).toBe(99);
        expect(result.title).toBe('Frontend Developer');
    });

    it('should throw an error if no initial status is found', async () => {
        jobStatusRepository.findInitialStatus.mockResolvedValue(null);

        await expect(createJob.execute({
            title: 'Frontend',
            company: 'Tech Corp',
            workModel: 'remote',
            description: 'A great job',
            appliedAt: new Date('2024-01-01')
        })).rejects.toThrow('No job statuses found');
    });

    it('should throw an error if mandatory skill is not found', async () => {
        jobStatusRepository.findInitialStatus.mockResolvedValue(new JobStatus({ id: 1, name: 'Triagem', order: 0 }));
        skillRepository.findById.mockResolvedValue(null);

        await expect(createJob.execute({
            title: 'Frontend',
            company: 'Tech Corp',
            workModel: 'remote',
            description: 'A great job',
            appliedAt: new Date('2024-01-01'),
            mandatorySkillsIds: [999]
        })).rejects.toThrow('Mandatory skill with id 999 not found');
    });
});
