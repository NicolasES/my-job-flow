import type { JobContactRepositoryInterface } from "@/repositories/interfaces/JobContactRepositoryInterface";
import { DomainError } from "@/errors/DomainError";

export type DeleteJobContactInput = {
    jobId: number;
    contactId: number;
};

export class DeleteJobContact {
    constructor(
        private readonly jobContactRepository: JobContactRepositoryInterface
    ) { }

    async execute(input: DeleteJobContactInput): Promise<void> {
        const { jobId, contactId } = input;
        const contact = await this.jobContactRepository.findById(contactId);
        if (!contact) {
            throw new DomainError('Contact not found');
        }
        if (contact.getJobId() !== jobId) {
            throw new DomainError('Contact does not belong to this job');
        }
        await this.jobContactRepository.delete(contactId);
    }
}
