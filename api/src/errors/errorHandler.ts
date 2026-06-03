import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { DomainError } from './DomainError';

import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';

export function globalErrorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
    if (hasZodFastifySchemaValidationErrors(error)) {
        return reply.status(400).send({
            statusCode: 400,
            error: 'Validation Error',
            message: 'Some provided fields are invalid',
            issues: error.validation.map((err) => ({
                field: err.instancePath ? err.instancePath.replace('/', '') : (err.params as any).issue?.path?.join('.'),
                message: err.message
            }))
        });
    }

    if (error instanceof DomainError) {
        return reply.status(422).send({
            statusCode: 422,
            error: error.name || 'Unprocessable Entity',
            message: error.message
        });
    }

    const statusCode = error.statusCode ?? 500;
    if (statusCode === 500) {
        console.error('[UNHANDLED ERROR]', error);
    }
    return reply.status(statusCode).send({
        statusCode: statusCode,
        error: error.name || 'Error',
        message: error.message || 'An internal server error occurred.'
    });
}
