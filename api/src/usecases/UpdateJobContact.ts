import type { JobContactRepositoryInterface } from "@/repositories/interfaces/JobContactRepositoryInterface";
import { DomainError } from "@/errors/DomainError";

export type UpdateJobContactInput = {
    jobId: number;
    contactId: number;
    name?: string;
    role?: string | null;
    linkedin?: string | null;
    phone?: string | null;
};

export type UpdateJobContactOutput = {
    id: number;
    name: string;
    role: string | null;
    linkedin: string | null;
    phone: string | null;
};

export class UpdateJobContact {
    constructor(
        private readonly jobContactRepository: JobContactRepositoryInterface
    ) { }

    async execute(input: UpdateJobContactInput): Promise<UpdateJobContactOutput> {
        const { jobId, contactId, name, role, linkedin, phone } = input;
        const contact = await this.jobContactRepository.findById(contactId);
        if (!contact) {
            throw new DomainError('Contact not found');
        }
        if (contact.getJobId() !== jobId) {
            throw new DomainError('Contact does not belong to this job');
        }
        if (name !== undefined) {
            contact.setName(name);
        }
        if (role !== undefined) {
            contact.setRole(role);
        }
        if (linkedin !== undefined) {
            contact.setLinkedin(linkedin);
        }
        if (phone !== undefined) {
            contact.setPhone(phone);
        }
        const jobContact = await this.jobContactRepository.update(contact);

        return {
            id: jobContact.getId()!,
            name: jobContact.getName(),
            role: jobContact.getRole(),
            linkedin: jobContact.getLinkedin(),
            phone: jobContact.getPhone()
        };
    }
}
