import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";
import { ArchiveIcon, UnarchiveIcon, TrashIcon } from "./icons/Icons";

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
                            {isArchived ? <UnarchiveIcon size="14" /> : <ArchiveIcon size="14" />}
                        </button>
                    )}
                    {onDeleteJob && (
                        <button
                            onClick={handleDelete}
                            title="Excluir vaga"
                            className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-700 transition-colors"
                        >
                            <TrashIcon size="14" />
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
