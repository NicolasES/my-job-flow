import { Job } from "@/entities/Job";

export interface JobRepositoryInterface {
    create(job: Job): Promise<Job>;
    associateSkills(jobId: number, mandatorySkillsIds: number[], recommendedSkillsIds: number[]): Promise<void>;
}
