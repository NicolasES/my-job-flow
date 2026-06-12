import { z } from "zod";
import type { FastifyRequest } from "fastify";

export const getArchivedJobsSchema = {
    schema: {
        querystring: z.object({
            q: z.string().optional()
        })
    }
};

export type GetArchivedJobsRequest = FastifyRequest<{
    Querystring: {
        q?: string;
    }
}>;
