import { z } from 'zod';
import type { FastifyRequest } from 'fastify';

export const updateJobLinkSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int(),
            linkId: z.coerce.number().int()
        }),
        body: z.object({
            title: z.string().min(1).optional(),
            url: z.string().min(1).optional()
        })
    }
};

export type UpdateJobLinkRequest = FastifyRequest<{
    Params: {
        id: number;
        linkId: number;
    };
    Body: {
        title?: string;
        url?: string;
    };
}>;
