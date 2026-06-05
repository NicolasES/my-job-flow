import type Application from "./Application";
import { JobStatusController } from "@/controllers/JobStatusController";
import { CreateJobStatus } from "@/usecases/CreateJobStatus";
import { createJobStatusSchema } from "@/request-validations/createJobStatusSchema";

import { JobStatusPrismaRepository } from '@/repositories/JobStatusPrismaRepository';
import { prisma } from "@/repositories/prisma";

export default function registerRoutes({ fastify }: Application) {
    const repository = new JobStatusPrismaRepository(prisma);
    const useCase = new CreateJobStatus(repository);
    const controller = new JobStatusController(useCase);

    fastify.post('/job-status', createJobStatusSchema, (req, rep) => controller.create(req.body as any, rep));
}
