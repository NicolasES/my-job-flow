import { z } from 'zod';

export const reorderJobStatusSchema = {
    schema: {
        body: z.array(z.object({
            id: z.number().int('ID deve ser um inteiro'),
            order: z.number().int('Order deve ser um inteiro').gte(0, 'Order deve ser maior ou igual a 0')
        })).min(1, 'Deve enviar pelo menos um status para reordenar')
    }
}
