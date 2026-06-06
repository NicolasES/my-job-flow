import type { SkillRepositoryInterface } from "@/repositories/interfaces/SkillRepositoryInterface";
import { DomainError } from "@/errors/DomainError";

export class DeleteSkill {
    constructor(
        private readonly skillRepository: SkillRepositoryInterface
    ) { }

    async execute(id: number): Promise<void> {
        const skill = await this.skillRepository.findById(id);
        if (!skill) {
            throw new DomainError('Skill not found');
        }

        await this.skillRepository.delete(id);
    }
}
