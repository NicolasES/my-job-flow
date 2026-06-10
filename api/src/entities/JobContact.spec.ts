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

    it('should set and get linkedin correctly', () => {
        const contact = new JobContact({ name: 'Ana Souza', jobId: 1 });
        expect(contact.getLinkedin()).toBeNull();
        
        contact.setLinkedin('https://linkedin.com/in/anasouza');
        expect(contact.getLinkedin()).toBe('https://linkedin.com/in/anasouza');

        contact.setLinkedin('   ');
        expect(contact.getLinkedin()).toBeNull();

        contact.setLinkedin(null);
        expect(contact.getLinkedin()).toBeNull();
    });

    it('should set and get phone correctly', () => {
        const contact = new JobContact({ name: 'Ana Souza', jobId: 1 });
        expect(contact.getPhone()).toBeNull();
        
        contact.setPhone('+5511999999999');
        expect(contact.getPhone()).toBe('+5511999999999');

        contact.setPhone('   ');
        expect(contact.getPhone()).toBeNull();

        contact.setPhone(null);
        expect(contact.getPhone()).toBeNull();
    });
});
