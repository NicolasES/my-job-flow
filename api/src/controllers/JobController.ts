import type { FastifyReply } from "fastify";
import type { CreateJob } from "@/usecases/CreateJob";
import type { GetJobDetails } from "@/usecases/GetJobDetails";
import type { CreateJobRequest } from "@/request-validations/createJobSchema";
import type { GetJobDetailsRequest } from "@/request-validations/getJobDetailsSchema";
import type { UpdateJob } from "@/usecases/UpdateJob";
import type { UpdateJobRequest } from "@/request-validations/updateJobSchema";
import type { AddJobSkill } from "@/usecases/AddJobSkill";
import type { RemoveJobSkill } from "@/usecases/RemoveJobSkill";
import type { AddJobSkillRequest } from "@/request-validations/addJobSkillSchema";
import type { RemoveJobSkillRequest } from "@/request-validations/removeJobSkillSchema";
import type { AddJobContact } from "@/usecases/AddJobContact";
import type { UpdateJobContact } from "@/usecases/UpdateJobContact";
import type { DeleteJobContact } from "@/usecases/DeleteJobContact";
import type { AddJobContactRequest } from "@/request-validations/addJobContactSchema";
import type { UpdateJobContactRequest } from "@/request-validations/updateJobContactSchema";
import type { DeleteJobContactRequest } from "@/request-validations/deleteJobContactSchema";

export class JobController {
    constructor(
        private readonly createJobUseCase: CreateJob,
        private readonly getJobDetailsUseCase: GetJobDetails,
        private readonly updateJobUseCase: UpdateJob,
        private readonly addJobSkillUseCase: AddJobSkill,
        private readonly removeJobSkillUseCase: RemoveJobSkill,
        private readonly addJobContactUseCase: AddJobContact,
        private readonly updateJobContactUseCase: UpdateJobContact,
        private readonly deleteJobContactUseCase: DeleteJobContact
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

    async update(request: UpdateJobRequest, reply: FastifyReply) {
        const { id } = request.params;
        const data = request.body;
        await this.updateJobUseCase.execute(id, data);
        return reply.status(200).send({ success: true });
    }

    async addSkill(request: AddJobSkillRequest, reply: FastifyReply) {
        const { id, type } = request.params;
        const { skillId } = request.body;
        await this.addJobSkillUseCase.execute({ jobId: id, skillId, type });
        return reply.status(200).send({ success: true });
    }

    async removeSkill(request: RemoveJobSkillRequest, reply: FastifyReply) {
        const { id, type, skillId } = request.params;
        await this.removeJobSkillUseCase.execute({ jobId: id, skillId, type });
        return reply.status(200).send({ success: true });
    }

    async addContact(request: AddJobContactRequest, reply: FastifyReply) {
        const { id } = request.params;
        const { name, role, linkedin, phone } = request.body;
        const output = await this.addJobContactUseCase.execute({ jobId: id, name, role, linkedin, phone });
        return reply.status(201).send(output);
    }

    async updateContact(request: UpdateJobContactRequest, reply: FastifyReply) {
        const { id, contactId } = request.params;
        const { name, role, linkedin, phone } = request.body;
        const output = await this.updateJobContactUseCase.execute({ jobId: id, contactId, name, role, linkedin, phone });
        return reply.status(200).send(output);
    }

    async deleteContact(request: DeleteJobContactRequest, reply: FastifyReply) {
        const { id, contactId } = request.params;
        await this.deleteJobContactUseCase.execute({ jobId: id, contactId });
        return reply.status(200).send({ success: true });
    }
}
