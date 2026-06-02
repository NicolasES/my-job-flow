import type Application from "./Application";

export default function registerRoutes(app: Application) {

    app.fastify.get('/ping', async (request, reply) => {
        return { message: 'pong' }
    });
}
