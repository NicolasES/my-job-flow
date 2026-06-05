import type Application from "./Application";
import { container } from "./diContainer";
import { JobStatusController } from "@/controllers/JobStatusController";
import { createJobStatusSchema } from "@/request-validations/createJobStatusSchema";
import { reorderJobStatusSchema } from "@/request-validations/reorderJobStatusSchema";

export default function registerRoutes({ fastify }: Application) {
    const jobStatusController = container.resolve<JobStatusController>('JobStatusController');

    fastify.post('/job-status', createJobStatusSchema, (req, rep) => jobStatusController.create(req.body as any, rep));
    fastify.get('/job-status', (req, rep) => jobStatusController.findAll(req, rep));
    fastify.patch('/job-status/reorder', reorderJobStatusSchema, (req, rep) => jobStatusController.reorder(req, rep));
}
