import { z } from 'zod';

const bodySchema = z.object({
    name: z.string().min(1, 'O nome é obrigatório').max(50, 'O nome deve ter no máximo 50 caracteres'),
});

export const createSkillSchema = {
    schema: {
        body: bodySchema
    }
}

export type CreateSkillBody = z.infer<typeof bodySchema>;
