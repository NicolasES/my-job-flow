import { Job } from "./Job";
import { JobStatus } from "./JobStatus";
import { jest } from '@jest/globals';

describe('Job Entity', () => {
    let mockStatus: JobStatus;

    beforeEach(() => {
        mockStatus = new JobStatus({ id: 1, name: 'Triagem', order: 0 });
    });

    it('should successfully create a Job with valid properties', () => {
        const job = new Job({
            title: 'Frontend Dev',
            company: 'Tech Corp',
            workModel: 'remote',
            description: 'Vaga maneira',
            appliedAt: new Date('2023-10-15'),
            status: mockStatus
        });

        expect(job.getTitle()).toBe('Frontend Dev');
        expect(job.getCompany()).toBe('Tech Corp');
        expect(job.getWorkModel()).toBe('remote');
    });

    it('should throw error if title is empty', () => {
        expect(() => new Job({
            title: '   ',
            company: 'Tech Corp',
            workModel: 'remote',
            description: '',
            appliedAt: new Date(),
            status: mockStatus
        })).toThrow('Job title cannot be empty');
    });

    it('should throw error if company is empty', () => {
        expect(() => new Job({
            title: 'Frontend Dev',
            company: '',
            workModel: 'remote',
            description: '',
            appliedAt: new Date(),
            status: mockStatus
        })).toThrow('Company name cannot be empty');
    });

    it('should throw error if work model is invalid', () => {
        expect(() => new Job({
            title: 'Frontend Dev',
            company: 'Tech Corp',
            workModel: 'alien' as any,
            description: '',
            appliedAt: new Date(),
            status: mockStatus
        })).toThrow("Invalid work model. Must be 'remote', 'hybrid' or 'onsite'");
    });

    it('should correctly get and set basic properties', () => {
        const job = new Job({
            id: 1,
            title: 'Backend Dev',
            company: 'Tech Corp',
            workModel: 'hybrid',
            salary: 5000,
            description: 'Vaga maneira',
            appliedAt: new Date('2023-10-15'),
            createdAt: new Date('2023-10-10'),
            status: mockStatus
        });

        expect(job.getId()).toBe(1);
        expect(job.getSalary()).toBe(5000);
        expect(job.getDescription()).toBe('Vaga maneira');
        expect(job.getAppliedAt()).toEqual(new Date('2023-10-15'));
        expect(job.getCreatedAt()).toEqual(new Date('2023-10-10'));
        expect(job.getStatus()).toBe(mockStatus);

        const newStatus = new JobStatus({ id: 2, name: 'Entrevista', order: 1 });
        
        job.setSalary(6000);
        job.setDescription('Nova descricão');
        job.setAppliedAt(new Date('2023-10-16'));
        job.setStatus(newStatus);

        expect(job.getSalary()).toBe(6000);
        expect(job.getDescription()).toBe('Nova descricão');
        expect(job.getAppliedAt()).toEqual(new Date('2023-10-16'));
        expect(job.getStatus()).toBe(newStatus);
    });

    it('should set current date for createdAt if not provided', () => {
        const before = new Date();
        const job = new Job({
            title: 'Frontend Dev',
            company: 'Tech Corp',
            workModel: 'remote',
            description: '',
            appliedAt: new Date(),
            status: mockStatus
        });
        const after = new Date();

        expect(job.getCreatedAt().getTime()).toBeGreaterThanOrEqual(before.getTime());
        expect(job.getCreatedAt().getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('should update properties through setters and validate them', () => {
        const job = new Job({
            title: 'Frontend Dev',
            company: 'Tech Corp',
            workModel: 'remote',
            description: '',
            appliedAt: new Date(),
            status: mockStatus
        });

        job.setTitle('Backend Dev');
        expect(job.getTitle()).toBe('Backend Dev');

        job.setCompany('Other Corp');
        expect(job.getCompany()).toBe('Other Corp');

        job.setWorkModel('onsite');
        expect(job.getWorkModel()).toBe('onsite');
    });

    it('should throw error when updating with invalid title via setter', () => {
        const job = new Job({
            title: 'Frontend Dev',
            company: 'Tech Corp',
            workModel: 'remote',
            description: '',
            appliedAt: new Date(),
            status: mockStatus
        });

        expect(() => job.setTitle('   ')).toThrow('Job title cannot be empty');
    });

    it('should throw error when updating with invalid company via setter', () => {
        const job = new Job({
            title: 'Frontend Dev',
            company: 'Tech Corp',
            workModel: 'remote',
            description: '',
            appliedAt: new Date(),
            status: mockStatus
        });

        expect(() => job.setCompany('  ')).toThrow('Company name cannot be empty');
    });

    it('should throw error when updating with invalid work model via setter', () => {
        const job = new Job({
            title: 'Frontend Dev',
            company: 'Tech Corp',
            workModel: 'remote',
            description: '',
            appliedAt: new Date(),
            status: mockStatus
        });

        expect(() => job.setWorkModel('alien' as any)).toThrow("Invalid work model. Must be 'remote', 'hybrid' or 'onsite'");
    });
});
