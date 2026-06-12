import { JobCard, type JobCardData } from "./JobCard";

interface KanbanColumnProps {
    title: string;
    jobs: JobCardData[];
    availableStatuses: { id: number; name: string; }[];
    onMoveJob: (id: number, newStatusId: number) => void;
}

export function KanbanColumn({ title, jobs, availableStatuses, onMoveJob }: KanbanColumnProps) {
    return (
        <div className="min-w-[320px] max-w-[320px] flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between">
                <h2 className="font-medium text-slate-300">{title} <span className="text-slate-500 text-sm">({jobs.length})</span></h2>
            </div>

            {/* Container dos Cards da Coluna */}
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 pr-2 pb-2">

                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        jobData={job}
                        availableStatuses={availableStatuses}
                        onMoveJob={onMoveJob}
                    />
                ))}

                {jobs.length === 0 && (
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center text-sm text-slate-500">
                        Nenhuma vaga nesta etapa.
                    </div>
                )}

            </div>

        </div>
    )
}