import type { FastifyRequest } from 'fastify';

export const updateJobContactSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                contactId: { type: 'integer' }
            },
            required: ['id', 'contactId']
        },
        body: {
            type: 'object',
            properties: {
                name: { type: 'string', minLength: 1 },
                role: { type: 'string', nullable: true },
                linkedin: { type: 'string', nullable: true },
                phone: { type: 'string', nullable: true }
            }
        }
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
