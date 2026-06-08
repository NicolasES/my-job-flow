import type { JobContact } from "@/entities/JobContact";

export interface JobContactRepositoryInterface {
    createMany(contacts: JobContact[]): Promise<void>;
}
