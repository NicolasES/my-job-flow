import type { JobLink } from "@/entities/JobLink";

export interface JobLinkRepositoryInterface {
    createMany(links: JobLink[]): Promise<void>;
}
