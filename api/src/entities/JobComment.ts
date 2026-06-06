import { DomainError } from "../errors/DomainError";

export type JobCommentProps = {
    id?: number;
    text: string;
    date?: Date;
    jobId: number;
}

export class JobComment {
    private id?: number;
    private text!: string;
    private date: Date;
    private jobId: number;

    constructor(props: JobCommentProps) {
        this.id = props.id;
        this.date = props.date ?? new Date();
        this.jobId = props.jobId;
        this.setText(props.text);
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getJobId(): number {
        return this.jobId;
    }

    public getText(): string {
        return this.text;
    }

    public setText(text: string): void {
        const trimmed = text.trim();
        if (!trimmed) {
            throw new DomainError('Comment text cannot be empty');
        }
        this.text = trimmed;
    }

    public getDate(): Date {
        return this.date;
    }
}
