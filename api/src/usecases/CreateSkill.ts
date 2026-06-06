import { Skill } from "@/entities/Skill";
import { DomainError } from "@/errors/DomainError";
import type { SkillRepositoryInterface } from "@/repositories/interfaces/SkillRepositoryInterface";

export class CreateSkill {
    constructor(
        private readonly skillRepository: SkillRepositoryInterface
    ) { }

    async execute(name: string): Promise<CreateSkillOutput> {
        const skill = new Skill({ name });

        const exists = await this.skillRepository.findByName(skill.getName());
        if (exists) {
            throw new DomainError('Skill already exists');
        }

        const created = await this.skillRepository.create(skill);

        return {
            id: created.getId()!,
            name: created.getName()
        };
    }
}

export type CreateSkillOutput = {
    id: number;
    name: string;
}
