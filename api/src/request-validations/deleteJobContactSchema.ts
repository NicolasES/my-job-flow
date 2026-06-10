import type { FastifyRequest } from 'fastify';

export const deleteJobContactSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                contactId: { type: 'integer' }
            },
            required: ['id', 'contactId']
        }
    }
};

export type DeleteJobContactRequest = FastifyRequest<{
    Params: {
        id: number;
        contactId: number;
    };
}>;
