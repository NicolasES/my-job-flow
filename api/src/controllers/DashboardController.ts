import type { FastifyRequest, FastifyReply } from "fastify";
import { GetDashboardJobs } from "../usecases/GetDashboardJobs";

export class DashboardController {
    constructor(private readonly getDashboardJobs: GetDashboardJobs) {}

    async getJobs(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as { q?: string };
        const filterText = query.q;

        const jobs = await this.getDashboardJobs.execute(filterText);

        return reply.status(200).send(jobs);
    }
}
