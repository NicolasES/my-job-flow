import { z } from "zod";
import type { FastifyRequest } from "fastify";

export const toggleJobArchiveSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int().positive("Invalid job ID")
        }),
        body: z.object({
            isArchived: z.boolean()
        })
    }
};

export type ToggleJobArchiveRequest = FastifyRequest<{
    Params: {
        id: number;
    },
    Body: {
        isArchived: boolean;
    }
}>;
