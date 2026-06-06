import type { SkillRepositoryInterface } from "@/repositories/interfaces/SkillRepositoryInterface";
import type { Skill } from "@/entities/Skill";

export class FindAllSkills {
    constructor(
        private readonly skillRepository: SkillRepositoryInterface
    ) { }

    async execute(): Promise<FindAllSkillsOutput> {
        const skills = await this.skillRepository.findAll();

        return skills.map(skill => ({
            id: skill.getId()!,
            name: skill.getName()
        }));
    }
}

export type FindAllSkillsOutput = {
    id: number;
    name: string;
}[]
