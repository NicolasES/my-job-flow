import type { Skill } from "@/entities/Skill";

export interface SkillRepositoryInterface {
    create(skill: Skill): Promise<Skill>;
    findAll(): Promise<Skill[]>;
    findById(id: number): Promise<Skill | null>;
    findByName(name: string): Promise<Skill | null>;
    delete(id: number): Promise<void>;
}
