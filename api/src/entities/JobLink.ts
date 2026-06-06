import { DomainError } from "../errors/DomainError";

export type JobLinkProps = {
    id?: number;
    title: string;
    url: string;
    jobId: number;
}

export class JobLink {
    private id?: number;
    private title!: string;
    private url!: string;
    private jobId: number;

    constructor(props: JobLinkProps) {
        this.id = props.id;
        this.jobId = props.jobId;
        
        this.setTitle(props.title);
        this.setUrl(props.url);
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getJobId(): number {
        return this.jobId;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        const trimmed = title.trim();
        if (!trimmed) {
            throw new DomainError('Link title cannot be empty');
        }
        this.title = trimmed;
    }

    public getUrl(): string {
        return this.url;
    }

    public setUrl(url: string): void {
        const trimmed = url.trim();
        if (!trimmed) {
            throw new DomainError('Link url cannot be empty');
        }
        // Very basic validation just for domain level logic
        if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
            throw new DomainError('Link url must start with http:// or https://');
        }
        this.url = trimmed;
    }
}
