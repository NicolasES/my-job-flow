import type { JobRepositoryInterface } from "@/repositories/interfaces/JobRepositoryInterface";
import type { SkillRepositoryInterface } from "@/repositories/interfaces/SkillRepositoryInterface";
import { DomainError } from "@/errors/DomainError";

export type RemoveJobSkillInput = {
    jobId: number;
    skillId: number;
    type: 'mandatory' | 'recommended';
};

export class RemoveJobSkill {
    constructor(
        private readonly jobRepository: JobRepositoryInterface,
        private readonly skillRepository: SkillRepositoryInterface
    ) { }

    async execute(input: RemoveJobSkillInput): Promise<void> {
        const { jobId, skillId, type } = input;
        const job = await this.jobRepository.findById(jobId);
        if (!job) {
            throw new DomainError('Job not found');
        }
        const skill = await this.skillRepository.findById(skillId);
        if (!skill) {
            return;
        }
        await this.jobRepository.removeSkill(jobId, skill.getId()!, type);
    }
}
