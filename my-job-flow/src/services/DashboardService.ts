import { fetchApi } from './api';

export interface DashboardJob {
    id: number;
    title: string;
    company: string;
    location: string;
    date: string;
    statusId: number;
}

export interface DashboardColumn {
    id: number;
    name: string;
    order: number;
    jobs: DashboardJob[];
}

export class DashboardService {
    static async getJobs(filterText?: string): Promise<DashboardColumn[]> {
        const query = filterText ? `?q=${encodeURIComponent(filterText)}` : '';
        return fetchApi(`/dashboard/jobs${query}`);
    }
}
