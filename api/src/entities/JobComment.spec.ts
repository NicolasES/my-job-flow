import { JobComment } from "./JobComment";
import { jest } from '@jest/globals';

describe('JobComment Entity', () => {
    it('should successfully create a comment', () => {
        const comment = new JobComment({ text: 'Fiz a entrevista', jobId: 1 });
        expect(comment.getText()).toBe('Fiz a entrevista');
        expect(comment.getId()).toBeUndefined();
        expect(comment.getDate()).toBeInstanceOf(Date);
        expect(comment.getJobId()).toBe(1);
    });

    it('should throw an error if the text is empty', () => {
        expect(() => new JobComment({ text: '', jobId: 1 })).toThrow('Comment text cannot be empty');
        expect(() => new JobComment({ text: '   ', jobId: 1 })).toThrow('Comment text cannot be empty');
    });
});
