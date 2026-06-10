import type { JobContact } from "@/entities/JobContact";

export interface JobContactRepositoryInterface {
    create(contact: JobContact): Promise<JobContact>;
    createMany(contacts: JobContact[]): Promise<void>;
    findById(id: number): Promise<JobContact | null>;
    update(contact: JobContact): Promise<JobContact>;
    delete(id: number): Promise<void>;
}
