import { z } from 'zod';

export const deleteJobCommentSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number(),
            commentId: z.coerce.number()
        })
    }
};

import type { FastifyRequest } from 'fastify';

export type DeleteJobCommentRequest = FastifyRequest<{
    Params: {
        id: number;
        commentId: number;
    };
}>;
