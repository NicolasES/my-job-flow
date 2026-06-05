import { z } from 'zod';

export const updateJobStatusSchema = {
    schema: {
        params: z.object({
            id: z.coerce.number().int('O ID deve ser um número inteiro')
        }),
        body: z.object({
            name: z.string().min(1, 'O nome é obrigatório')
        })
    }
}
