import fastify, { type FastifyInstance } from 'fastify'

export default class Application {
    public fastify: FastifyInstance

    constructor() {
        this.fastify = fastify({ logger: true })
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