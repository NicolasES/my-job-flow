import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import type { JobCommentRepositoryInterface } from "../repositories/interfaces/JobCommentRepositoryInterface";
import { DomainError } from "../errors/DomainError";

export interface UpdateJobCommentInput {
    jobId: number;
    commentId: number;
    text: string;
}

export class UpdateJobComment {
    constructor(
        private readonly jobRepository: JobRepositoryInterface,
        private readonly jobCommentRepository: JobCommentRepositoryInterface
    ) { }

    async execute(input: UpdateJobCommentInput): Promise<void> {
        const job = await this.jobRepository.findById(input.jobId);
        if (!job) {
            throw new DomainError('Job not found');
        }
        const comment = await this.jobCommentRepository.findById(input.commentId);
        if (!comment) {
            throw new DomainError('Comment not found');
        }
        if (comment.getJobId() !== input.jobId) {
            throw new DomainError('Comment does not belong to this job');
        }
        comment.setText(input.text);
        await this.jobCommentRepository.update(comment);
    }
}
