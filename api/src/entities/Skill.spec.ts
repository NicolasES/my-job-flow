import { Skill } from "./Skill";

describe('Skill Entity', () => {
    it('should successfully create a skill', () => {
        const skill = new Skill({ name: 'TypeScript' });
        expect(skill.getName()).toBe('TypeScript');
        expect(skill.getId()).toBeUndefined();
    });

    it('should remove leading and trailing whitespaces from name', () => {
        const skill = new Skill({ name: '   React   ' });
        expect(skill.getName()).toBe('React');
    });

    it('should throw an error if the name is empty', () => {
        expect(() => new Skill({ name: '' })).toThrow('Skill name cannot be empty');
        expect(() => new Skill({ name: '   ' })).toThrow('Skill name cannot be empty');
    });

    it('should throw an error if the name exceeds 50 characters', () => {
        const longName = 'A'.repeat(51);
        expect(() => new Skill({ name: longName })).toThrow('Skill name cannot exceed 50 characters');
    });
});
