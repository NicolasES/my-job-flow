import { DomainError } from "../errors/DomainError";
import { JobStatus } from "./JobStatus";

export type JobWorkModel = 'remote' | 'hybrid' | 'onsite';

export type JobProps = {
    id?: number;
    title: string;
    company: string;
    workModel: JobWorkModel;
    salary?: number | null;
    description: string;
    appliedAt: Date;
    createdAt?: Date;

    status: JobStatus;
}

export class Job {
    private id?: number;
    private title!: string;
    private company!: string;
    private workModel!: JobWorkModel;
    private salary: number | null;
    private description: string;
    private appliedAt: Date;
    private createdAt: Date;

    private status: JobStatus;

    constructor(props: JobProps) {
        this.id = props.id;
        this.salary = props.salary ?? null;
        this.description = props.description.trim();
        this.appliedAt = props.appliedAt;
        this.createdAt = props.createdAt ?? new Date();
        this.status = props.status;

        this.setTitle(props.title);
        this.setCompany(props.company);
        this.setWorkModel(props.workModel);
    }

    public getId(): number | undefined { return this.id; }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        const trimmed = title.trim();
        if (!trimmed) throw new DomainError('Job title cannot be empty');
        this.title = trimmed;
    }

    public getCompany(): string {
        return this.company;
    }

    public setCompany(company: string): void {
        const trimmed = company.trim();
        if (!trimmed) throw new DomainError('Company name cannot be empty');
        this.company = trimmed;
    }

    public getWorkModel(): JobWorkModel {
        return this.workModel;
    }
    public setWorkModel(model: JobWorkModel): void {
        if (!['remote', 'hybrid', 'onsite'].includes(model)) {
            throw new DomainError("Invalid work model. Must be 'remote', 'hybrid' or 'onsite'");
        }
        this.workModel = model;
    }

    public getSalary(): number | null {
        return this.salary;
    }
    public setSalary(salary: number | null): void {
        this.salary = salary;
    }

    public getDescription(): string {
        return this.description;
    }
    public setDescription(description: string): void {
        this.description = description.trim();
    }

    public getAppliedAt(): Date {
        return this.appliedAt;
    }
    public setAppliedAt(appliedAt: Date): void {
        this.appliedAt = appliedAt;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getStatus(): JobStatus {
        return this.status;
    }
    public setStatus(status: JobStatus): void { this.status = status; }
}
