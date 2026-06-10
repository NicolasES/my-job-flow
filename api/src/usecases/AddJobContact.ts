import type { JobRepositoryInterface } from "@/repositories/interfaces/JobRepositoryInterface";
import type { JobContactRepositoryInterface } from "@/repositories/interfaces/JobContactRepositoryInterface";
import { JobContact } from "@/entities/JobContact";
import { DomainError } from "@/errors/DomainError";

export type AddJobContactInput = {
    jobId: number;
    name: string;
    role?: string | null;
    linkedin?: string | null;
    phone?: string | null;
};

export type AddJobContactOutput = {
    id: number;
    name: string;
    role: string | null;
    linkedin: string | null;
    phone: string | null;
};

export class AddJobContact {
    constructor(
        private readonly jobRepository: JobRepositoryInterface,
        private readonly jobContactRepository: JobContactRepositoryInterface
    ) { }

    async execute(input: AddJobContactInput): Promise<AddJobContactOutput> {
        const { jobId, name, role, linkedin, phone } = input;
        const job = await this.jobRepository.findById(jobId);
        if (!job) {
            throw new DomainError('Job not found');
        }
        const contact = new JobContact({
            jobId,
            name,
            role,
            linkedin,
            phone
        });
        const jobContact = await this.jobContactRepository.create(contact);

        return {
            id: jobContact.getId()!,
            name: jobContact.getName(),
            role: jobContact.getRole(),
            linkedin: jobContact.getLinkedin(),
            phone: jobContact.getPhone()
        };
    }
}
