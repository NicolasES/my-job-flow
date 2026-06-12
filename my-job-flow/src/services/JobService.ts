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
    isArchived: boolean;
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

export const WORK_MODEL_OPTIONS = [
    { value: 'remote', label: 'Remoto' },
    { value: 'hybrid', label: 'Híbrido' },
    { value: 'onsite', label: 'Presencial' },
];

export const getWorkModelLabel = (value: string) => {
    return WORK_MODEL_OPTIONS.find(opt => opt.value === value)?.label || value;
};

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

    static async update(id: number, data: {
        title: string;
        company: string;
        workModel: string;
        statusId: number;
        description: string;
        appliedAt: string;
        salary?: number | null;
    }): Promise<void> {
        await fetchApi(`/jobs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    static async changeStatus(id: number, statusId: number): Promise<void> {
        await fetchApi(`/jobs/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ statusId })
        });
    }

    static async delete(id: number): Promise<void> {
        await fetchApi(`/jobs/${id}`, {
            method: 'DELETE'
        });
    }

    static async toggleArchive(id: number, isArchived: boolean): Promise<void> {
        await fetchApi(`/jobs/${id}/archive`, {
            method: 'PATCH',
            body: JSON.stringify({ isArchived })
        });
    }

    static async addSkill(jobId: number, type: 'mandatory' | 'recommended', skillId: number): Promise<void> {
        await fetchApi(`/jobs/${jobId}/skills/${type}`, {
            method: 'POST',
            body: JSON.stringify({ skillId })
        });
    }

    static async removeSkill(jobId: number, type: 'mandatory' | 'recommended', skillId: number): Promise<void> {
        await fetchApi(`/jobs/${jobId}/skills/${type}/${skillId}`, {
            method: 'DELETE'
        });
    }

    static async addContact(jobId: number, contact: { name: string; role?: string; linkedin?: string; phone?: string }): Promise<any> {
        return await fetchApi(`/jobs/${jobId}/contacts`, {
            method: 'POST',
            body: JSON.stringify(contact)
        });
    }

    static async updateContact(jobId: number, contactId: number, contact: { name?: string; role?: string; linkedin?: string; phone?: string }): Promise<void> {
        await fetchApi(`/jobs/${jobId}/contacts/${contactId}`, {
            method: 'PUT',
            body: JSON.stringify(contact)
        });
    }

    static async deleteContact(jobId: number, contactId: number): Promise<void> {
        await fetchApi(`/jobs/${jobId}/contacts/${contactId}`, {
            method: 'DELETE'
        });
    }

    static async addLink(jobId: number, link: { title: string; url: string }): Promise<any> {
        return await fetchApi(`/jobs/${jobId}/links`, {
            method: 'POST',
            body: JSON.stringify(link)
        });
    }

    static async updateLink(jobId: number, linkId: number, link: { title?: string; url?: string }): Promise<void> {
        await fetchApi(`/jobs/${jobId}/links/${linkId}`, {
            method: 'PUT',
            body: JSON.stringify(link)
        });
    }

    static async deleteLink(jobId: number, linkId: number) {
        return fetchApi(`/jobs/${jobId}/links/${linkId}`, {
            method: 'DELETE'
        });
    }

    static async addComment(jobId: number, text: string) {
        return fetchApi(`/jobs/${jobId}/comments`, {
            method: 'POST',
            body: JSON.stringify({ text })
        });
    }

    static async updateComment(jobId: number, commentId: number, text: string) {
        return fetchApi(`/jobs/${jobId}/comments/${commentId}`, {
            method: 'PUT',
            body: JSON.stringify({ text })
        });
    }

    static async deleteComment(jobId: number, commentId: number) {
        return fetchApi(`/jobs/${jobId}/comments/${commentId}`, {
            method: 'DELETE'
        });
    }
}
