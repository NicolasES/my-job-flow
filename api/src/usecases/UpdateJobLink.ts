import type { JobLinkRepositoryInterface } from "@/repositories/interfaces/JobLinkRepositoryInterface";
import { DomainError } from "@/errors/DomainError";

export type UpdateJobLinkInput = {
    jobId: number;
    linkId: number;
    title?: string;
    url?: string;
};

export type UpdateJobLinkOutput = {
    id: number;
    title: string;
    url: string;
};

export class UpdateJobLink {
    constructor(
        private readonly jobLinkRepository: JobLinkRepositoryInterface
    ) { }

    async execute(input: UpdateJobLinkInput): Promise<UpdateJobLinkOutput> {
        const { jobId, linkId, title, url } = input;
        const link = await this.jobLinkRepository.findById(linkId);
        if (!link) {
            throw new DomainError('Link not found');
        }
        if (link.getJobId() !== jobId) {
            throw new DomainError('Link does not belong to this job');
        }
        if (title !== undefined) {
            link.setTitle(title);
        }
        if (url !== undefined) {
            link.setUrl(url);
        }
        const updated = await this.jobLinkRepository.update(link);

        return {
            id: updated.getId()!,
            title: updated.getTitle(),
            url: updated.getUrl()
        };
    }
}
