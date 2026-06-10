import type { FastifyRequest } from 'fastify';

export const addJobLinkSchema = {
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
                title: { type: 'string', minLength: 1 },
                url: { type: 'string', minLength: 1 }
            },
            required: ['title', 'url']
        }
    }
};

export type AddJobLinkRequest = FastifyRequest<{
    Params: {
        id: number;
    };
    Body: {
        title: string;
        url: string;
    };
}>;
