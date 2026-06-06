import { z } from 'zod';

const paramsSchema = z.object({
    id: z.coerce.number().int('O ID deve ser um número inteiro'),
});

export const deleteSkillSchema = {
    schema: {
        params: paramsSchema
    }
}

export type DeleteSkillParams = z.infer<typeof paramsSchema>;
