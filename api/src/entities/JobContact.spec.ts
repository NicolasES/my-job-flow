import { JobContact } from "./JobContact";
import { jest } from '@jest/globals';

describe('JobContact Entity', () => {
    it('should successfully create a contact', () => {
        const contact = new JobContact({ name: 'Ana Souza', role: 'Tech Recruiter', jobId: 1 });
        expect(contact.getName()).toBe('Ana Souza');
        expect(contact.getRole()).toBe('Tech Recruiter');
        expect(contact.getLinkedin()).toBeNull();
        expect(contact.getPhone()).toBeNull();
        expect(contact.getJobId()).toBe(1);
    });

    it('should throw an error if the name is empty', () => {
        expect(() => new JobContact({ name: '', role: 'Recruiter', jobId: 1 })).toThrow('Contact name cannot be empty');
    });

    it('should allow an empty role', () => {
        const contact = new JobContact({ name: 'Ana Souza', role: '   ', jobId: 1 });
        expect(contact.getRole()).toBe(null);
    });
});
