import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";

export type JobCardData = {
    id: number;
    title: string;
    company: string;
    location: string;
    date: string;
    statusId: number;
    isArchived?: boolean;
}

export interface JobCardProps {
    jobData: JobCardData;
    availableStatuses: { id: number; name: string; }[];
    onMoveJob?: (id: number, newStatusId: number) => void;
    onDeleteJob?: (id: number) => void;
    onToggleArchiveJob?: (id: number, currentIsArchived: boolean) => void;
}

export function JobCard({ jobData, availableStatuses, onMoveJob, onDeleteJob, onToggleArchiveJob }: JobCardProps) {
    const { id, title, company, location, date, statusId, isArchived = false } = jobData;
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

    const handleToggleArchive = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!onToggleArchiveJob) return;

        const actionText = isArchived ? "desarquivar" : "arquivar";
        const isConfirmed = await modal.confirm({
            title: isArchived ? "Desarquivar Vaga" : "Arquivar Vaga",
            message: `Tem certeza que deseja ${actionText} a vaga "${title}"?`,
            confirmText: isArchived ? "Desarquivar" : "Arquivar",
            variant: "primary"
        });

        if (isConfirmed) {
            onToggleArchiveJob(id, !isArchived);
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
                    {onToggleArchiveJob && (
                        <button
                            onClick={handleToggleArchive}
                            title={isArchived ? "Desarquivar vaga" : "Arquivar vaga"}
                            className="p-1 rounded text-slate-500 hover:text-blue-400 hover:bg-slate-700 transition-colors"
                        >
                            {isArchived ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 8v13H3V8"></path>
                                    <path d="M1 3h22v5H1z"></path>
                                    <path d="M10 12h4"></path>
                                    <path d="m12 16 3-3-3-3-3 3z"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="21 8 21 21 3 21 3 8"></polyline>
                                    <rect x="1" y="3" width="22" height="5"></rect>
                                    <line x1="10" y1="12" x2="14" y2="12"></line>
                                </svg>
                            )}
                        </button>
                    )}
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
