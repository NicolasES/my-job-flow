import type { FastifyReply } from "fastify";
import type { CreateJob } from "@/usecases/CreateJob";
import type { GetJobDetails } from "@/usecases/GetJobDetails";
import type { CreateJobRequest } from "@/request-validations/createJobSchema";
import type { GetJobDetailsRequest } from "@/request-validations/getJobDetailsSchema";

export class JobController {
    constructor(
        private readonly createJobUseCase: CreateJob,
        private readonly getJobDetailsUseCase: GetJobDetails
    ) { }

    async create(request: CreateJobRequest, reply: FastifyReply) {
        const data = request.body;
        const output = await this.createJobUseCase.execute(data);
        return reply.status(201).send(output);
    }

    async getDetails(request: GetJobDetailsRequest, reply: FastifyReply) {
        const { id } = request.params;
        const output = await this.getJobDetailsUseCase.execute(id);
        return reply.status(200).send(output);
    }
}
