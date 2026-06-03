import { JobStatus } from './JobStatus';
import { DomainError } from '@/errors/DomainError';

describe('JobStatus Entity', () => {
    it('should successfully create a job status when data is valid', () => {
        const jobStatus = new JobStatus({ id: 1, name: 'To Do', order: 0 });
        
        expect(jobStatus.getName()).toBe('To Do');
        expect(jobStatus.getOrder()).toBe(0);
        expect(jobStatus.getId()).toBe(1);
        expect(jobStatus.getCreateAt()).toBeInstanceOf(Date);
    });

    it('should throw a DomainError if the name is less than 2 characters long', () => {
        expect(() => new JobStatus({ name: 'A', order: 1 })).toThrow(DomainError);
        expect(() => new JobStatus({ name: 'A', order: 1 })).toThrow('Name must be at least 2 characters long');
    });

    it('should throw a DomainError if the order is negative', () => {
        expect(() => new JobStatus({ name: 'Valid Name', order: -1 })).toThrow(DomainError);
        expect(() => new JobStatus({ name: 'Valid Name', order: -1 })).toThrow('Order must be a positive number');
    });
});
