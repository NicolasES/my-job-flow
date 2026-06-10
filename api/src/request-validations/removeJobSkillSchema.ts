import type { FastifyRequest } from "fastify";

export const removeJobSkillSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                type: { type: 'string', enum: ['mandatory', 'recommended'] },
                skillId: { type: 'integer' }
            },
            required: ['id', 'type', 'skillId']
        }
    }
};

export type RemoveJobSkillRequest = FastifyRequest<{
    Params: {
        id: number;
        type: 'mandatory' | 'recommended';
        skillId: number;
    };
}>;
