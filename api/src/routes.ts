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
import { addJobSkillSchema } from '@/request-validations/addJobSkillSchema';
import { removeJobSkillSchema } from '@/request-validations/removeJobSkillSchema';
import { addJobContactSchema } from '@/request-validations/addJobContactSchema';
import { updateJobContactSchema } from '@/request-validations/updateJobContactSchema';
import { deleteJobContactSchema } from '@/request-validations/deleteJobContactSchema';
import { addJobLinkSchema } from '@/request-validations/addJobLinkSchema';
import { updateJobLinkSchema } from '@/request-validations/updateJobLinkSchema';
import { deleteJobLinkSchema } from '@/request-validations/deleteJobLinkSchema';

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
    fastify.post('/jobs/:id/skills/:type', addJobSkillSchema, (req, rep) => jobController.addSkill(req as any, rep));
    fastify.delete('/jobs/:id/skills/:type/:skillId', removeJobSkillSchema, (req, rep) => jobController.removeSkill(req as any, rep));

    fastify.post('/jobs/:id/contacts', addJobContactSchema, (req, rep) => jobController.addContact(req as any, rep));
    fastify.put('/jobs/:id/contacts/:contactId', updateJobContactSchema, (req, rep) => jobController.updateContact(req as any, rep));
    fastify.delete('/jobs/:id/contacts/:contactId', deleteJobContactSchema, (req, res) => jobController.deleteContact(req as any, res));

    // Links
    fastify.post('/jobs/:id/links', addJobLinkSchema, (req, res) => jobController.addLink(req as any, res));
    fastify.put('/jobs/:id/links/:linkId', updateJobLinkSchema, (req, res) => jobController.updateLink(req as any, res));
    fastify.delete('/jobs/:id/links/:linkId', deleteJobLinkSchema, (req, res) => jobController.deleteLink(req as any, res));
}
