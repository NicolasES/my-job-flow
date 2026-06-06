import { jest } from '@jest/globals';
import { DeleteSkill } from "./DeleteSkill";
import type { SkillRepositoryInterface } from "@/repositories/interfaces/SkillRepositoryInterface";
import { Skill } from "@/entities/Skill";

describe('DeleteSkill UseCase', () => {
    let mockRepository: jest.Mocked<SkillRepositoryInterface>;
    let deleteSkill: DeleteSkill;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            delete: jest.fn()
        };
        deleteSkill = new DeleteSkill(mockRepository);
    });

    it('should successfully delete a skill', async () => {
        mockRepository.findById.mockResolvedValue(new Skill({ id: 1, name: 'Docker' }));
        mockRepository.delete.mockResolvedValue();

        await deleteSkill.execute(1);

        expect(mockRepository.findById).toHaveBeenCalledWith(1);
        expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the skill is not found', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(deleteSkill.execute(999)).rejects.toThrow('Skill not found');
        expect(mockRepository.delete).not.toHaveBeenCalled();
    });
});
