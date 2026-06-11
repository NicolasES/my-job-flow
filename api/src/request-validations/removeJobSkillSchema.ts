import { z } from 'zod';
import type { FastifyRequest } from 'fastify';

export const removeJobSkillSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int(),
            type: z.enum(['mandatory', 'recommended']),
            skillId: z.coerce.number().int()
        })
    }
};

export type RemoveJobSkillRequest = FastifyRequest<{
    Params: {
        id: number;
        type: 'mandatory' | 'recommended';
        skillId: number;
    };
}>;
