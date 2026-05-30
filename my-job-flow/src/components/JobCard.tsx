import { useNavigate } from "react-router-dom";

export type JobCardData = {
    id: number;
    title: string;
    company: string;
    location: string;
    date: string;
    status: string;
}

export interface JobCardProps {
    jobData: JobCardData;
    availableStatuses: string[];
    onMoveJob: (id: number, newStatus: string) => void;
}

export function JobCard({ jobData, availableStatuses, onMoveJob }: JobCardProps) {
    const { id, title, company, location, date, status } = jobData;
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/job/${id}`)}
            className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-slate-600 cursor-pointer transition-colors"
        >

            {/* Title and Select Dropdown */}
            <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="font-semibold text-slate-100 leading-tight">{title}</h3>

                {onMoveJob && (
                    <select
                        className="bg-slate-900 text-xs text-slate-300 border border-slate-600 rounded p-1 focus:outline-none cursor-pointer"
                        value={status}
                        onChange={(e) => onMoveJob(id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        title="Mover para outra coluna"
                    >
                        {availableStatuses.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                )}
            </div>

            <p className="text-sm text-slate-400">@ {company}</p>

            <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                <span className="truncate max-w-[150px]" title={location}>📍 {location}</span>
                <span>{date}</span>
            </div>

        </div>
    )
}
