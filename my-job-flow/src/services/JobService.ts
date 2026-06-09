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

export interface JobDetailsOutput {
    id: number;
    title: string;
    company: string;
    workModel: string;
    salary: number | null;
    description: string;
    appliedAt: string;
    createdAt: string;
    status: {
        id: number;
        name: string;
        order: number;
    };
    contacts: {
        id: number;
        name: string;
        role: string | null;
        linkedin: string | null;
        phone: string | null;
    }[];
    links: {
        id: number;
        title: string;
        url: string;
    }[];
    comments: {
        id: number;
        text: string;
        date: string; // The backend returns Date, but JSON parsing will make it string on frontend
    }[];
    mandatorySkills: {
        id: number;
        name: string;
    }[];
    recommendedSkills: {
        id: number;
        name: string;
    }[];
}

export class JobService {
    static async create(data: CreateJobInput): Promise<JobOutput> {
        return fetchApi<JobOutput>('/jobs', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async getDetails(id: number): Promise<JobDetailsOutput> {
        return fetchApi<JobDetailsOutput>(`/jobs/${id}`);
    }
}
