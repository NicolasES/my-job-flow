import { JobCard, type JobCardProps } from "./JobCard";

interface KanbanColumnProps {
    title: string;
    jobs: Array<{ id: number } & JobCardProps>
}

export function KanbanColumn({ title, jobs }: KanbanColumnProps) {
    return (
        <div className="min-w-[320px] max-w-[320px] flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="font-medium text-slate-300">{title} <span className="text-slate-500 text-sm">({jobs.length})</span></h2>
            </div>

            {/* Container dos Cards da Coluna */}
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3">

                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        date={job.date}
                    />
                ))}

            </div>

        </div>
    )
}