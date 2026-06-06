import { z } from 'zod';

const bodySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    order: z.number().int('Order must be an integer').gte(0, 'Order must be greater than or equal to 0')
});

export const createJobStatusSchema = {
    schema: {
        body: bodySchema
    }
}

export type CreateJobStatusBody = z.infer<typeof bodySchema>;
