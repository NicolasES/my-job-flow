type JobStatusProps = {
    id?: number;
    name: string;
    order: number;
}

import { DomainError } from "@/errors/DomainError";

export class JobStatus {
    private id?: number
    private name!: string
    private order!: number
    private createAt: Date

    constructor(props: JobStatusProps) {
        this.id = props.id
        this.setName(props.name)
        this.setOrder(props.order)
        this.createAt = new Date()
    }

    getId(): number | undefined {
        return this.id
    }

    getName(): string {
        return this.name
    }

    getOrder(): number {
        return this.order
    }

    getCreateAt(): Date {
        return this.createAt
    }

    setId(id: number): void {
        this.id = id
    }

    setName(name: string): void {
        if (name.length < 2) throw new DomainError('Name must be at least 2 characters long')
        this.name = name
    }

    setOrder(order: number): void {
        if (order < 0) throw new DomainError('Order must be a positive number')
        this.order = order
    }
}