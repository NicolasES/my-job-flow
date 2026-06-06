import { jest } from '@jest/globals';
import { FindAllSkills } from "./FindAllSkills";
import type { SkillRepositoryInterface } from "@/repositories/interfaces/SkillRepositoryInterface";
import { Skill } from "@/entities/Skill";

describe('FindAllSkills UseCase', () => {
    let mockRepository: jest.Mocked<SkillRepositoryInterface>;
    let findAllSkills: FindAllSkills;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            delete: jest.fn()
        };
        findAllSkills = new FindAllSkills(mockRepository);
    });

    it('should return all skills', async () => {
        mockRepository.findAll.mockResolvedValue([
            new Skill({ id: 1, name: 'React' }),
            new Skill({ id: 2, name: 'Node.js' })
        ]);

        const result = await findAllSkills.execute();

        expect(result).toHaveLength(2);
        expect(result[0]!.name).toBe('React');
        expect(result[1]!.name).toBe('Node.js');
        expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
});
