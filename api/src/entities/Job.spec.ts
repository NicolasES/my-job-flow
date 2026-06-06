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
});
