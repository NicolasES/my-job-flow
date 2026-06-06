import { fetchApi } from './api';

export interface JobStatus {
    id: number;
    name: string;
    order: number;
}

export class JobStatusService {
    static async findAll(): Promise<JobStatus[]> {
        return fetchApi<JobStatus[]>('/job-status');
    }

    static async create(name: string, order: number): Promise<JobStatus> {
        return fetchApi<JobStatus>('/job-status', {
            method: 'POST',
            body: JSON.stringify({ name, order })
        });
    }

    static async update(id: number, name: string): Promise<JobStatus> {
        return fetchApi<JobStatus>(`/job-status/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name })
        });
    }

    static async reorder(items: { id: number, order: number }[]): Promise<void> {
        return fetchApi<void>('/job-status/reorder', {
            method: 'PATCH',
            body: JSON.stringify(items)
        });
    }

    static async delete(id: number): Promise<void> {
        return fetchApi<void>(`/job-status/${id}`, {
            method: 'DELETE'
        });
    }
}
