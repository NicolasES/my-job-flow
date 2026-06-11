import { JobComment } from "@/entities/JobComment";

export interface JobCommentRepositoryInterface {
    create(comment: JobComment): Promise<JobComment>;
    findById(id: number): Promise<JobComment | null>;
    update(comment: JobComment): Promise<void>;
    delete(id: number): Promise<void>;
}
