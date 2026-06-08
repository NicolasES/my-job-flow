import type { JobRepositoryInterface } from "./JobRepositoryInterface";
import type { JobContactRepositoryInterface } from "./JobContactRepositoryInterface";
import type { JobLinkRepositoryInterface } from "./JobLinkRepositoryInterface";

export interface UnitOfWorkRepositories {
    jobRepository: JobRepositoryInterface;
    jobContactRepository: JobContactRepositoryInterface;
    jobLinkRepository: JobLinkRepositoryInterface;
}

export interface UnitOfWork {
    execute<T>(work: (repos: UnitOfWorkRepositories) => Promise<T>): Promise<T>;
}
