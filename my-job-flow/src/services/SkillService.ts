import { fetchApi } from './api';

export interface Skill {
    id: number;
    name: string;
}

export class SkillService {
    static async findAll(): Promise<Skill[]> {
        return fetchApi<Skill[]>('/skills');
    }

    static async create(name: string): Promise<Skill> {
        return fetchApi<Skill>('/skills', {
            method: 'POST',
            body: JSON.stringify({ name })
        });
    }

    static async delete(id: number): Promise<void> {
        return fetchApi<void>(`/skills/${id}`, {
            method: 'DELETE'
        });
    }
}
