export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DomainError';

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DomainError);
        }
    }
}
