import { z } from 'zod';
import type { FastifyRequest } from 'fastify';

export const deleteJobContactSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int(),
            contactId: z.coerce.number().int()
        })
    }
};

export type DeleteJobContactRequest = FastifyRequest<{
    Params: {
        id: number;
        contactId: number;
    };
}>;
