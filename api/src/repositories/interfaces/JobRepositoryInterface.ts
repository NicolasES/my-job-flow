import { Job } from "@/entities/Job";

export interface JobRepositoryInterface {
    create(job: Job): Promise<Job>;
    findById(id: number): Promise<Job | null>;
    update(job: Job): Promise<Job>;
    associateSkills(jobId: number, mandatorySkillsIds: number[], recommendedSkillsIds: number[]): Promise<void>;
    addSkill(jobId: number, skillId: number, type: 'mandatory' | 'recommended'): Promise<void>;
    removeSkill(jobId: number, skillId: number, type: 'mandatory' | 'recommended'): Promise<void>;
    delete(id: number): Promise<void>;
}
