import type { FastifyReply } from "fastify";
import { CreateJobStatus } from "@/usecases/CreateJobStatus";

import type { CreateJobStatusInput } from "@/usecases/CreateJobStatus";

export class JobStatusController {
    constructor(
        private readonly createJobStatusUseCase: CreateJobStatus
    ) { }

    async create(body: CreateJobStatusInput, reply: FastifyReply) {
        const jobStatus = await this.createJobStatusUseCase.execute(body)
        return reply.status(201).send(jobStatus)
    }
}