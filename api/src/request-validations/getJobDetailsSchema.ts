import { z } from "zod";
import type { FastifyRequest } from "fastify";

export const getJobDetailsSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int().positive("Invalid job ID")
        })
    }
};

export type GetJobDetailsRequest = FastifyRequest<{
    Params: {
        id: number;
    }
}>;
