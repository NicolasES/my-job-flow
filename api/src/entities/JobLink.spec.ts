import { JobLink } from "./JobLink";
import { jest } from '@jest/globals';

describe('JobLink Entity', () => {
    it('should successfully create a link', () => {
        const link = new JobLink({ title: 'Desafio', url: 'https://github.com/abc', jobId: 1 });
        expect(link.getTitle()).toBe('Desafio');
        expect(link.getUrl()).toBe('https://github.com/abc');
        expect(link.getJobId()).toBe(1);
    });

    it('should throw an error if the title is empty', () => {
        expect(() => new JobLink({ title: '', url: 'https://github.com/abc', jobId: 1 })).toThrow('Link title cannot be empty');
    });

    it('should throw an error if the url is empty', () => {
        expect(() => new JobLink({ title: 'Desafio', url: '   ', jobId: 1 })).toThrow('Link url cannot be empty');
    });

    it('should throw an error if the url is invalid', () => {
        expect(() => new JobLink({ title: 'Desafio', url: 'www.github.com', jobId: 1 })).toThrow('Link url must start with http:// or https://');
    });
});
