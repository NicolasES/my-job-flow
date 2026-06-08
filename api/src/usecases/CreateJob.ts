import { Job, type JobWorkModel } from "@/entities/Job";
import { JobContact } from "@/entities/JobContact";
import { JobLink } from "@/entities/JobLink";
import { DomainError } from "@/errors/DomainError";
import type { JobStatusRepositoryInterface } from "@/repositories/interfaces/JobStatusRepositoryInterface";
import type { SkillRepositoryInterface } from "@/repositories/interfaces/SkillRepositoryInterface";
import type { UnitOfWork } from "@/repositories/interfaces/UnitOfWork";

export type CreateJobInput = {
    title: string;
    company: string;
    workModel: JobWorkModel;
    salary?: number | null;
    description: string;
    appliedAt: Date;

    contacts?: { name: string; role?: string | null; linkedin?: string | null; phone?: string | null; }[];
    links?: { title: string; url: string; }[];
    mandatorySkillsIds?: number[];
    recommendedSkillsIds?: number[];
}

export type CreateJobOutput = {
    id: number;
    title: string;
}

export class CreateJob {
    constructor(
        private readonly unitOfWork: UnitOfWork,
        private readonly jobStatusRepository: JobStatusRepositoryInterface,
        private readonly skillRepository: SkillRepositoryInterface
    ) { }

    async execute(input: CreateJobInput): Promise<CreateJobOutput> {
        const status = await this.jobStatusRepository.findInitialStatus();
        if (!status) {
            throw new DomainError('No job statuses found. Please create a job status first.');
        }
        if (input.mandatorySkillsIds && input.mandatorySkillsIds.length > 0) {
            for (const id of input.mandatorySkillsIds) {
                const skill = await this.skillRepository.findById(id);
                if (!skill) throw new DomainError(`Mandatory skill with id ${id} not found`);
            }
        }
        if (input.recommendedSkillsIds && input.recommendedSkillsIds.length > 0) {
            for (const id of input.recommendedSkillsIds) {
                const skill = await this.skillRepository.findById(id);
                if (!skill) throw new DomainError(`Recommended skill with id ${id} not found`);
            }
        }
        const createdJob = await this.unitOfWork.execute(async (repos) => {
            const job = new Job({
                title: input.title,
                company: input.company,
                workModel: input.workModel,
                salary: input.salary,
                description: input.description,
                appliedAt: input.appliedAt,
                status: status
            });
            const savedJob = await repos.jobRepository.create(job);
            const jobId = savedJob.getId()!;
            const contacts = (input.contacts ?? []).map(c => new JobContact({
                name: c.name,
                role: c.role,
                linkedin: c.linkedin,
                phone: c.phone,
                jobId
            }));
            await repos.jobContactRepository.createMany(contacts);
            const links = (input.links ?? []).map(l => new JobLink({
                title: l.title,
                url: l.url,
                jobId
            }));
            await repos.jobLinkRepository.createMany(links);
            await repos.jobRepository.associateSkills(
                jobId,
                input.mandatorySkillsIds ?? [],
                input.recommendedSkillsIds ?? []
            );

            return savedJob;
        });

        return {
            id: createdJob.getId()!,
            title: createdJob.getTitle()
        };
    }
}
