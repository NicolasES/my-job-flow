import { z } from 'zod';

export const updateJobCommentSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number(),
            commentId: z.coerce.number()
        }),
        body: z.object({
            text: z.string().min(1, "Comment text cannot be empty")
        })
    }
};

import type { FastifyRequest } from 'fastify';

export type UpdateJobCommentRequest = FastifyRequest<{
    Params: {
        id: number;
        commentId: number;
    };
    Body: {
        text: string;
    };
}>;
