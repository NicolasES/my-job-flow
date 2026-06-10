import type { FastifyRequest } from "fastify";

export const addJobSkillSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                type: { type: 'string', enum: ['mandatory', 'recommended'] }
            },
            required: ['id', 'type']
        },
        body: {
            type: 'object',
            properties: {
                skillId: { type: 'integer' }
            },
            required: ['skillId']
        }
    }
};

export type AddJobSkillRequest = FastifyRequest<{
    Params: {
        id: number;
        type: 'mandatory' | 'recommended';
    };
    Body: {
        skillId: number;
    };
}>;
