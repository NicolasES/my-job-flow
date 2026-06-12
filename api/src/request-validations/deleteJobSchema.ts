import { z } from "zod";
import type { FastifyRequest } from "fastify";

export const deleteJobSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int().positive("Invalid job ID")
        })
    }
};

export type DeleteJobRequest = FastifyRequest<{
    Params: {
        id: number;
    }
}>;
