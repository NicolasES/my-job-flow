import { z } from "zod";
import type { FastifyRequest } from "fastify";

export const createJobSchema = {
    schema: {
        body: z.object({
            title: z.string().min(1, "Job title is required"),
            company: z.string().min(1, "Company is required"),
            workModel: z.enum(['remote', 'hybrid', 'onsite']),
            salary: z.number().nullable().optional(),
            description: z.string().min(1, "Description is required"),
            appliedAt: z.string().transform((str) => new Date(str)),

            contacts: z.array(z.object({
                name: z.string().min(1, "Contact name is required"),
                role: z.string().min(1, "Contact role is required"),
                linkedin: z.string().nullable().optional(),
                phone: z.string().nullable().optional()
            })).optional(),
            links: z.array(z.object({
                title: z.string().min(1, "Link title is required"),
                url: z.string().url("Link must be a valid URL")
            })).optional(),
            mandatorySkillsIds: z.array(z.number().int().positive()).optional(),
            recommendedSkillsIds: z.array(z.number().int().positive()).optional()
        })
    }
}

export type CreateJobRequest = FastifyRequest<{
    Body: {
        title: string;
        company: string;
        workModel: 'remote' | 'hybrid' | 'onsite';
        salary?: number | null;
        description: string;
        appliedAt: Date;

        contacts?: { name: string; role: string; linkedin?: string | null; phone?: string | null; }[];
        links?: { title: string; url: string; }[];
        mandatorySkillsIds?: number[];
        recommendedSkillsIds?: number[];
    }
}>
