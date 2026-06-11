import { z } from 'zod';
import type { FastifyRequest } from 'fastify';

export const updateJobContactSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int(),
            contactId: z.coerce.number().int()
        }),
        body: z.object({
            name: z.string().min(1).optional(),
            role: z.string().nullable().optional(),
            linkedin: z.string().nullable().optional(),
            phone: z.string().nullable().optional()
        })
    }
};

export type UpdateJobContactRequest = FastifyRequest<{
    Params: {
        id: number;
        contactId: number;
    };
    Body: {
        name?: string;
        role?: string | null;
        linkedin?: string | null;
        phone?: string | null;
    };
}>;
