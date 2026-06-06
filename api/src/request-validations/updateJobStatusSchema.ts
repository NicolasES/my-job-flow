import { z } from 'zod';

const paramsSchema = z.object({
    id: z.coerce.number().int('O ID deve ser um número inteiro')
});

const bodySchema = z.object({
    name: z.string().min(1, 'O nome é obrigatório')
});

export const updateJobStatusSchema = {
    schema: {
        params: paramsSchema,
        body: bodySchema
    }
}

export type UpdateJobStatusParams = z.infer<typeof paramsSchema>;
export type UpdateJobStatusBody = z.infer<typeof bodySchema>;