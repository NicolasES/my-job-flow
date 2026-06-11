import { z } from 'zod';
import type { FastifyRequest } from 'fastify';

export const changeJobStatusSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int()
        }),
        body: z.object({
            statusId: z.number().int()
        })
    }
};

export type ChangeJobStatusRequest = FastifyRequest<{
    Params: {
        id: number;
    };
    Body: {
        statusId: number;
    };
}>;
