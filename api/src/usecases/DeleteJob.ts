import { inject, injectable } from "tsyringe";
import type { JobRepositoryInterface } from "../repositories/interfaces/JobRepositoryInterface";
import { DomainError } from "@/errors/DomainError";

@injectable()
export class DeleteJob {
    constructor(
        @inject("JobRepository")
        private jobRepository: JobRepositoryInterface
    ) { }

    async execute(id: number): Promise<void> {
        const job = await this.jobRepository.findById(id);
        if (!job) {
            throw new DomainError("Job not found");
        }

        await this.jobRepository.delete(id);
    }
}
