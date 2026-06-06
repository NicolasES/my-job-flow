import { z } from 'zod';

const paramsSchema = z.object({
    id: z.coerce.number().int('O ID deve ser um número inteiro')
});

export const deleteJobStatusSchema = {
    schema: {
        params: paramsSchema
    }
}

export type DeleteJobStatusParams = z.infer<typeof paramsSchema>;
