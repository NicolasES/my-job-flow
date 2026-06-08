import { DomainError } from "../errors/DomainError";

export type JobContactProps = {
    id?: number;
    name: string;
    role?: string | null;
    linkedin?: string | null;
    phone?: string | null;
    jobId: number;
}

export class JobContact {
    private id?: number;
    private name!: string;
    private role!: string | null;
    private linkedin: string | null;
    private phone: string | null;
    private jobId: number;

    constructor(props: JobContactProps) {
        this.id = props.id;
        this.linkedin = props.linkedin ?? null;
        this.phone = props.phone ?? null;
        this.jobId = props.jobId;

        this.setName(props.name);
        this.setRole(props.role);
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getJobId(): number {
        return this.jobId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        const trimmed = name.trim();
        if (!trimmed) {
            throw new DomainError('Contact name cannot be empty');
        }
        this.name = trimmed;
    }

    public getRole(): string | null {
        return this.role;
    }

    public setRole(role?: string | null): void {
        if (role === null || role === undefined) {
            this.role = null;
            return;
        }
        const trimmed = role.trim();
        this.role = trimmed || null;
    }

    public getLinkedin(): string | null {
        return this.linkedin;
    }

    public getPhone(): string | null {
        return this.phone;
    }
}
