import type { FastifyRequest } from 'fastify';

export const addJobContactSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' }
            },
            required: ['id']
        },
        body: {
            type: 'object',
            properties: {
                name: { type: 'string', minLength: 1 },
                role: { type: 'string', nullable: true },
                linkedin: { type: 'string', nullable: true },
                phone: { type: 'string', nullable: true }
            },
            required: ['name']
        }
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
