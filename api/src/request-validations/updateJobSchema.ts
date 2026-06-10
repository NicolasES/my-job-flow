import { z } from "zod";
import type { FastifyRequest } from "fastify";

export const updateJobSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int().positive("Invalid Job ID")
        }),
        body: z.object({
            title: z.string().min(1, "Job title is required"),
            company: z.string().min(1, "Company is required"),
            workModel: z.enum(['remote', 'hybrid', 'onsite']),
            salary: z.number().nullable().optional(),
            description: z.string().min(1, "Description is required"),
            appliedAt: z.string().transform((str) => new Date(str)),
        })
    }
}

export type UpdateJobRequest = FastifyRequest<{
    Params: {
        id: number;
    },
    Body: {
        title: string;
        company: string;
        workModel: 'remote' | 'hybrid' | 'onsite';
        salary?: number | null;
        description: string;
        appliedAt: Date;
    }
}>;
