import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateJobStatus } from "@/usecases/CreateJobStatus";
import { FindAllJobStatus } from "@/usecases/FindAllJobStatus";

import type { CreateJobStatusInput } from "@/usecases/CreateJobStatus";

export class JobStatusController {
    constructor(
        private readonly createJobStatusUseCase: CreateJobStatus,
        private readonly findAllJobStatusUseCase: FindAllJobStatus
    ) { }

    async create(body: CreateJobStatusInput, reply: FastifyReply) {
        const jobStatus = await this.createJobStatusUseCase.execute(body)
        return reply.status(201).send(jobStatus)
    }

    async findAll(request: FastifyRequest, reply: FastifyReply) {
        const statuses = await this.findAllJobStatusUseCase.execute()
        return reply.status(200).send(statuses)
    }
}