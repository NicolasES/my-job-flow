import { z } from 'zod';
import type { FastifyRequest } from 'fastify';

export const addJobContactSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int()
        }),
        body: z.object({
            name: z.string().min(1),
            role: z.string().nullable().optional(),
            linkedin: z.string().nullable().optional(),
            phone: z.string().nullable().optional()
        })
    }
};

export type AddJobContactRequest = FastifyRequest<{
    Params: {
        id: number;
    };
    Body: {
        name: string;
        role?: string | null;
        linkedin?: string | null;
        phone?: string | null;
    };
}>;
