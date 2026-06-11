import { z } from 'zod';

export const addJobCommentSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number()
        }),
        body: z.object({
            text: z.string().min(1, "Comment text cannot be empty")
        })
    }
};

import type { FastifyRequest } from 'fastify';

export type AddJobCommentRequest = FastifyRequest<{
    Params: {
        id: number;
    };
    Body: {
        text: string;
    };
}>;
