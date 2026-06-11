import { JobComment } from "../entities/JobComment";
import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import type { JobCommentRepositoryInterface } from "../repositories/interfaces/JobCommentRepositoryInterface";
import { DomainError } from "../errors/DomainError";

export interface AddJobCommentInput {
    jobId: number;
    text: string;
}

export class AddJobComment {
    constructor(
        private readonly jobRepository: JobRepositoryInterface,
        private readonly jobCommentRepository: JobCommentRepositoryInterface
    ) { }

    async execute(input: AddJobCommentInput): Promise<any> {
        const job = await this.jobRepository.findById(input.jobId);
        if (!job) {
            throw new DomainError('Job not found');
        }
        const comment = new JobComment({
            jobId: input.jobId,
            text: input.text
        });
        const created = await this.jobCommentRepository.create(comment);

        return {
            id: created.getId(),
            text: created.getText(),
            date: created.getDate()
        };
    }
}
