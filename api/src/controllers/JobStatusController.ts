import type { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export type ZodRequest<T extends RouteGenericInterface> = FastifyRequest<T, any, any, any, ZodTypeProvider>;

import { CreateJobStatus } from "@/usecases/CreateJobStatus";
import { FindAllJobStatus } from "@/usecases/FindAllJobStatus";
import { ReorderJobStatus } from "@/usecases/ReorderJobStatus";
import { UpdateJobStatus } from "@/usecases/UpdateJobStatus";
import { DeleteJobStatus } from "@/usecases/DeleteJobStatus";

import type { UpdateJobStatusParams, UpdateJobStatusBody } from "@/request-validations/updateJobStatusSchema";
import type { CreateJobStatusBody } from "@/request-validations/createJobStatusSchema";
import type { ReorderJobStatusBody } from "@/request-validations/reorderJobStatusSchema";
import type { DeleteJobStatusParams } from "@/request-validations/deleteJobStatusSchema";

export class JobStatusController {
    constructor(
        private readonly createJobStatusUseCase: CreateJobStatus,
        private readonly findAllJobStatusUseCase: FindAllJobStatus,
        private readonly reorderJobStatusUseCase: ReorderJobStatus,
        private readonly updateJobStatusUseCase: UpdateJobStatus,
        private readonly deleteJobStatusUseCase: DeleteJobStatus
    ) { }

    async create(request: ZodRequest<{ Body: CreateJobStatusBody }>, reply: FastifyReply) {
        const jobStatus = await this.createJobStatusUseCase.execute(request.body)
        return reply.status(201).send(jobStatus)
    }

    async findAll(request: FastifyRequest, reply: FastifyReply) {
        const statuses = await this.findAllJobStatusUseCase.execute()
        return reply.status(200).send(statuses)
    }

    async reorder(request: ZodRequest<{ Body: ReorderJobStatusBody }>, reply: FastifyReply) {
        await this.reorderJobStatusUseCase.execute(request.body)
        return reply.status(204).send()
    }

    async update(request: ZodRequest<{ Params: UpdateJobStatusParams, Body: UpdateJobStatusBody }>, reply: FastifyReply) {
        const updated = await this.updateJobStatusUseCase.execute(request.params.id, request.body);
        return reply.status(200).send(updated);
    }

    async delete(request: ZodRequest<{ Params: DeleteJobStatusParams }>, reply: FastifyReply) {
        await this.deleteJobStatusUseCase.execute(request.params.id);
        return reply.status(204).send();
    }
}