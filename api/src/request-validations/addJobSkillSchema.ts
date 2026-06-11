import { z } from 'zod';
import type { FastifyRequest } from 'fastify';

export const addJobSkillSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int(),
            type: z.enum(['mandatory', 'recommended'])
        }),
        body: z.object({
            skillId: z.number().int()
        })
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
