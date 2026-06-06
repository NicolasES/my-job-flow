import { DomainError } from "@/errors/DomainError";

export interface SkillProps {
    id?: number;
    name: string;
}

export class Skill {
    private id?: number;
    private name!: string;

    constructor(props: SkillProps) {
        this.id = props.id;
        this.setName(props.name);
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        const trimmedName = name.trim();
        if (!trimmedName) {
            throw new DomainError('Skill name cannot be empty');
        }
        if (trimmedName.length > 50) {
            throw new DomainError('Skill name cannot exceed 50 characters');
        }
        this.name = trimmedName;
    }
}
