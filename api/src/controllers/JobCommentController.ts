import type { FastifyReply } from "fastify";
import type { AddJobComment } from "@/usecases/AddJobComment";
import type { UpdateJobComment } from "@/usecases/UpdateJobComment";
import type { DeleteJobComment } from "@/usecases/DeleteJobComment";
import type { AddJobCommentRequest } from "@/request-validations/addJobCommentSchema";
import type { UpdateJobCommentRequest } from "@/request-validations/updateJobCommentSchema";
import type { DeleteJobCommentRequest } from "@/request-validations/deleteJobCommentSchema";

export class JobCommentController {
    constructor(
        private readonly addJobCommentUseCase: AddJobComment,
        private readonly updateJobCommentUseCase: UpdateJobComment,
        private readonly deleteJobCommentUseCase: DeleteJobComment
    ) {}

    async addComment(request: AddJobCommentRequest, reply: FastifyReply) {
        const { id } = request.params;
        const { text } = request.body;
        const output = await this.addJobCommentUseCase.execute({ jobId: id, text });
        return reply.status(201).send(output);
    }

    async updateComment(request: UpdateJobCommentRequest, reply: FastifyReply) {
        const { id, commentId } = request.params;
        const { text } = request.body;
        await this.updateJobCommentUseCase.execute({ jobId: id, commentId, text });
        return reply.status(200).send({ success: true });
    }

    async deleteComment(request: DeleteJobCommentRequest, reply: FastifyReply) {
        const { id, commentId } = request.params;
        await this.deleteJobCommentUseCase.execute({ jobId: id, commentId });
        return reply.status(200).send({ success: true });
    }
}
