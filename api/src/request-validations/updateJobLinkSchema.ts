import type { FastifyRequest } from 'fastify';

export const updateJobLinkSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                linkId: { type: 'integer' }
            },
            required: ['id', 'linkId']
        },
        body: {
            type: 'object',
            properties: {
                title: { type: 'string', minLength: 1 },
                url: { type: 'string', minLength: 1 }
            }
        }
    }
};

export type UpdateJobLinkRequest = FastifyRequest<{
    Params: {
        id: number;
        linkId: number;
    };
    Body: {
        title?: string;
        url?: string;
    };
}>;
