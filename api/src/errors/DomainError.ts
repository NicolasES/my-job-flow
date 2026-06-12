export class DomainError extends Error {
    public code?: string;

    constructor(message: string, code?: string) {
        super(message);
        this.name = 'DomainError';
        this.code = code;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DomainError);
        }
    }
}
