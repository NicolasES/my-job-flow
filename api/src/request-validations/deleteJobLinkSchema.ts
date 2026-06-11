import { z } from 'zod';
import type { FastifyRequest } from 'fastify';

export const deleteJobLinkSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int(),
            linkId: z.coerce.number().int()
        })
    }
};

export type DeleteJobLinkRequest = FastifyRequest<{
    Params: {
        id: number;
        linkId: number;
    };
}>;
