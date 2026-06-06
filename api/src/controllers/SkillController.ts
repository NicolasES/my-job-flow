import type { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export type ZodRequest<T extends RouteGenericInterface> = FastifyRequest<T, any, any, any, ZodTypeProvider>;
import type { CreateSkill } from "@/usecases/CreateSkill";
import type { FindAllSkills } from "@/usecases/FindAllSkills";
import type { DeleteSkill } from "@/usecases/DeleteSkill";
import type { CreateSkillBody } from "@/request-validations/createSkillSchema";
import type { DeleteSkillParams } from "@/request-validations/deleteSkillSchema";

export class SkillController {
    constructor(
        private readonly createSkillUseCase: CreateSkill,
        private readonly findAllSkillsUseCase: FindAllSkills,
        private readonly deleteSkillUseCase: DeleteSkill
    ) { }

    async create(request: ZodRequest<{ Body: CreateSkillBody }>, reply: FastifyReply) {
        const result = await this.createSkillUseCase.execute(request.body.name);
        return reply.status(201).send(result);
    }

    async findAll(request: any, reply: FastifyReply) {
        const skills = await this.findAllSkillsUseCase.execute();
        return reply.send(skills);
    }

    async delete(request: ZodRequest<{ Params: DeleteSkillParams }>, reply: FastifyReply) {
        await this.deleteSkillUseCase.execute(request.params.id);
        return reply.status(204).send();
    }
}
