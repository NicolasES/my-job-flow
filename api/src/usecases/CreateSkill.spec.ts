import { jest } from '@jest/globals';
import { CreateSkill } from "./CreateSkill";
import type { SkillRepositoryInterface } from "@/repositories/interfaces/SkillRepositoryInterface";
import { Skill } from "@/entities/Skill";

describe('CreateSkill UseCase', () => {
    let mockRepository: jest.Mocked<SkillRepositoryInterface>;
    let createSkill: CreateSkill;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            delete: jest.fn()
        };
        createSkill = new CreateSkill(mockRepository);
    });

    it('should successfully create a skill', async () => {
        mockRepository.findByName.mockResolvedValue(null);
        mockRepository.create.mockImplementation(async (skill) => new Skill({ id: 1, name: skill.getName() }));

        const result = await createSkill.execute('Node.js');

        expect(result.id).toBe(1);
        expect(result.name).toBe('Node.js');
        expect(mockRepository.findByName).toHaveBeenCalledWith('Node.js');
        expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the skill already exists', async () => {
        mockRepository.findByName.mockResolvedValue(new Skill({ id: 1, name: 'Node.js' }));

        await expect(createSkill.execute('React')).rejects.toThrow('Skill already exists');
        expect(mockRepository.create).not.toHaveBeenCalled();
    });
});
