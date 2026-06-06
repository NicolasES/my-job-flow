import fastify, { type FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod"
import { globalErrorHandler } from "./errors/errorHandler"

export default class Application {
    public fastify: FastifyInstance<any, any, any, any, ZodTypeProvider>

    constructor() {
        this.fastify = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()
        this.fastify.register(cors, {
            origin: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
        })
        this.fastify.setValidatorCompiler(validatorCompiler)
        this.fastify.setSerializerCompiler(serializerCompiler)
        this.fastify.setErrorHandler(globalErrorHandler);
    }

    start(port: number = 3333) {
        this.fastify.listen({ port: port, host: '0.0.0.0' }, (err, address) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
            console.log(`Server listening at ${address}`)
        })
    }
}