import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";

export type JobCardData = {
    id: number;
    title: string;
    company: string;
    location: string;
    date: string;
    statusId: number;
}

export interface JobCardProps {
    jobData: JobCardData;
    availableStatuses: { id: number; name: string; }[];
    onMoveJob: (id: number, newStatusId: number) => void;
    onDeleteJob?: (id: number) => void;
}

export function JobCard({ jobData, availableStatuses, onMoveJob, onDeleteJob }: JobCardProps) {
    const { id, title, company, location, date, statusId } = jobData;
    const navigate = useNavigate();
    const modal = useModal();

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!onDeleteJob) return;

        const isConfirmed = await modal.confirm({
            title: "Excluir Vaga",
            message: `Tem certeza que deseja excluir a vaga "${title}" da empresa ${company}?`,
            confirmText: "Excluir",
            variant: "danger"
        });

        if (isConfirmed) {
            onDeleteJob(id);
        }
    };

    return (
        <div 
            onClick={() => navigate(`/job/${id}`)}
            className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-slate-600 cursor-pointer transition-colors"
        >

            {/* Title and Select Dropdown */}
            <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="font-semibold text-slate-100 leading-tight">{title}</h3>

                <div className="flex items-center gap-1">
                    {onDeleteJob && (
                        <button
                            onClick={handleDelete}
                            title="Excluir vaga"
                            className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                        </button>
                    )}
                    {onMoveJob && (
                    <select
                        className="bg-slate-900 text-xs text-slate-300 border border-slate-600 rounded p-1 focus:outline-none cursor-pointer"
                        value={statusId}
                        onChange={(e) => onMoveJob(id, Number(e.target.value))}
                        onClick={(e) => e.stopPropagation()}
                        title="Mover para outra coluna"
                    >
                        {availableStatuses.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                )}
                </div>
            </div>

            <p className="text-sm text-slate-400">@ {company}</p>

            <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                <span className="truncate max-w-[150px]" title={location}>📍 {location}</span>
                <span>{date}</span>
            </div>

        </div>
    )
}
