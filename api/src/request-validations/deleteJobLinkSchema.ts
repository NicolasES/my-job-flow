import type { FastifyRequest } from 'fastify';

export const deleteJobLinkSchema = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                linkId: { type: 'integer' }
            },
            required: ['id', 'linkId']
        }
    }
};

export type DeleteJobLinkRequest = FastifyRequest<{
    Params: {
        id: number;
        linkId: number;
    };
}>;
