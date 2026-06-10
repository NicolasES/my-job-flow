import type { JobLink } from "@/entities/JobLink";

export interface JobLinkRepositoryInterface {
    create(link: JobLink): Promise<JobLink>;
    createMany(links: JobLink[]): Promise<void>;
    findById(id: number): Promise<JobLink | null>;
    update(link: JobLink): Promise<JobLink>;
    delete(id: number): Promise<void>;
}
