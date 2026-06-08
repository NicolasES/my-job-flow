import type { FastifyReply } from "fastify";
import type { CreateJob } from "@/usecases/CreateJob";
import type { CreateJobRequest } from "@/request-validations/createJobSchema";
import { DomainError } from "@/errors/DomainError";

export class JobController {
    constructor(private readonly createJobUseCase: CreateJob) { }

    async create(request: CreateJobRequest, reply: FastifyReply) {
        const data = request.body;
        const output = await this.createJobUseCase.execute(data);
        return reply.status(201).send(output);
    }
}
