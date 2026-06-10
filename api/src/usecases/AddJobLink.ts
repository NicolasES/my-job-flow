import type { JobRepositoryInterface } from "@/repositories/interfaces/JobRepositoryInterface";
import type { JobLinkRepositoryInterface } from "@/repositories/interfaces/JobLinkRepositoryInterface";
import { JobLink } from "@/entities/JobLink";
import { DomainError } from "@/errors/DomainError";

export type AddJobLinkInput = {
    jobId: number;
    title: string;
    url: string;
};

export type AddJobLinkOutput = {
    id: number;
    title: string;
    url: string;
};

export class AddJobLink {
    constructor(
        private readonly jobRepository: JobRepositoryInterface,
        private readonly jobLinkRepository: JobLinkRepositoryInterface
    ) { }

    async execute(input: AddJobLinkInput): Promise<AddJobLinkOutput> {
        const { jobId, title, url } = input;
        const job = await this.jobRepository.findById(jobId);
        if (!job) {
            throw new DomainError('Job not found');
        }
        const link = new JobLink({
            jobId,
            title,
            url
        });
        const created = await this.jobLinkRepository.create(link);

        return {
            id: created.getId()!,
            title: created.getTitle(),
            url: created.getUrl()
        };
    }
}
