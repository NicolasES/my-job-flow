import { z } from 'zod';
import type { FastifyRequest } from 'fastify';

export const addJobLinkSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int()
        }),
        body: z.object({
            title: z.string().min(1),
            url: z.string().min(1)
        })
    }
};

export type AddJobLinkRequest = FastifyRequest<{
    Params: {
        id: number;
    };
    Body: {
        title: string;
        url: string;
    };
}>;
