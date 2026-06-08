import { fetchApi } from './api';

export interface CreateJobInput {
    title: string;
    company: string;
    workModel: string;
    salary?: number | null;
    description: string;
    appliedAt: string;
    contacts?: { name: string; role?: string | null; linkedin?: string | null; phone?: string | null; }[];
    links?: { title: string; url: string; }[];
    mandatorySkillsIds?: number[];
    recommendedSkillsIds?: number[];
}

export interface JobOutput {
    id: number;
    title: string;
}

export class JobService {
    static async create(data: CreateJobInput): Promise<JobOutput> {
        return fetchApi<JobOutput>('/jobs', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async getDetails(id: number): Promise<any> {
        return fetchApi<any>(`/jobs/${id}`);
    }
}
