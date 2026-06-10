import type { JobLinkRepositoryInterface } from "@/repositories/interfaces/JobLinkRepositoryInterface";
import { DomainError } from "@/errors/DomainError";

export type DeleteJobLinkInput = {
    jobId: number;
    linkId: number;
};

export class DeleteJobLink {
    constructor(
        private readonly jobLinkRepository: JobLinkRepositoryInterface
    ) { }

    async execute(input: DeleteJobLinkInput): Promise<void> {
        const { jobId, linkId } = input;
        const link = await this.jobLinkRepository.findById(linkId);
        if (!link) {
            throw new DomainError('Link not found');
        }
        if (link.getJobId() !== jobId) {
            throw new DomainError('Link does not belong to this job');
        }
        await this.jobLinkRepository.delete(linkId);
    }
}
