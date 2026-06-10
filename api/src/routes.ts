import type Application from "./Application";
import { container } from "./diContainer";

// Job Status
import { JobStatusController } from "@/controllers/JobStatusController";
import { createJobStatusSchema } from "@/request-validations/createJobStatusSchema";
import { reorderJobStatusSchema } from "@/request-validations/reorderJobStatusSchema";
import { updateJobStatusSchema } from "@/request-validations/updateJobStatusSchema";
import { deleteJobStatusSchema } from "@/request-validations/deleteJobStatusSchema";

// Skills
import { SkillController } from "@/controllers/SkillController";
import { createSkillSchema } from "@/request-validations/createSkillSchema";
import { deleteSkillSchema } from "@/request-validations/deleteSkillSchema";

// Jobs
import { JobController } from '@/controllers/JobController';
import { createJobSchema } from '@/request-validations/createJobSchema';
import { getJobDetailsSchema } from '@/request-validations/getJobDetailsSchema';
import { updateJobSchema } from '@/request-validations/updateJobSchema';

export default function registerRoutes({ fastify }: Application) {
    // === JOB STATUS ROUTES ===
    const jobStatusController = container.resolve<JobStatusController>('JobStatusController');

    fastify.post('/job-status', createJobStatusSchema, (req, rep) => jobStatusController.create(req as any, rep));
    fastify.get('/job-status', (req, rep) => jobStatusController.findAll(req as any, rep));
    fastify.patch('/job-status/reorder', reorderJobStatusSchema, (req, rep) => jobStatusController.reorder(req as any, rep));
    fastify.put('/job-status/:id', updateJobStatusSchema, (req, rep) => jobStatusController.update(req as any, rep));
    fastify.delete('/job-status/:id', deleteJobStatusSchema, (req, rep) => jobStatusController.delete(req as any, rep));

    // === SKILLS ROUTES ===
    const skillController = container.resolve<SkillController>('SkillController');

    fastify.post('/skills', createSkillSchema, (req, rep) => skillController.create(req as any, rep));
    fastify.get('/skills', (req, rep) => skillController.findAll(req as any, rep));
    fastify.delete('/skills/:id', deleteSkillSchema, (req, rep) => skillController.delete(req as any, rep));

    // === JOBS ROUTES ===
    const jobController = container.resolve<JobController>('JobController');
    fastify.post('/jobs', createJobSchema, (req, rep) => jobController.create(req as any, rep));
    fastify.get('/jobs/:id', getJobDetailsSchema, (req, rep) => jobController.getDetails(req as any, rep));
    fastify.put('/jobs/:id', updateJobSchema, (req, rep) => jobController.update(req as any, rep));
}
