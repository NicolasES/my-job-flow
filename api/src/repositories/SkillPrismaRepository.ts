import type { SkillRepositoryInterface } from "./interfaces/SkillRepositoryInterface";
import { Skill } from "@/entities/Skill";
import { prisma } from '@/repositories/prisma';

export class SkillPrismaRepository implements SkillRepositoryInterface {
    constructor(
        private readonly prismaClient: typeof prisma
    ) { }

    async create(skill: Skill): Promise<Skill> {
        const created = await this.prismaClient.skill.create({
            data: {
                name: skill.getName()
            }
        });

        return new Skill({
            id: created.id,
            name: created.name
        });
    }

    async findAll(): Promise<Skill[]> {
        const skills = await this.prismaClient.skill.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return skills.map(skill => new Skill({
            id: skill.id,
            name: skill.name
        }));
    }

    async findById(id: number): Promise<Skill | null> {
        const skill = await this.prismaClient.skill.findUnique({
            where: { id }
        });

        if (!skill) return null;

        return new Skill({
            id: skill.id,
            name: skill.name
        });
    }

    async findByName(name: string): Promise<Skill | null> {
        const skill = await this.prismaClient.skill.findUnique({
            where: { name }
        });

        if (!skill) return null;

        return new Skill({
            id: skill.id,
            name: skill.name
        });
    }

    async delete(id: number): Promise<void> {
        await this.prismaClient.skill.delete({
            where: { id }
        });
    }
}
