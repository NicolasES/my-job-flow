import { z } from 'zod';

const bodySchema = z.array(z.object({
    id: z.number().int('ID deve ser um inteiro'),
    order: z.number().int('Order deve ser um inteiro').gte(0, 'Order deve ser maior ou igual a 0')
})).min(1, 'Deve enviar pelo menos um status para reordenar');

export const reorderJobStatusSchema = {
    schema: {
        body: bodySchema
    }
}

export type ReorderJobStatusBody = z.infer<typeof bodySchema>;
