import { useState } from "react";
import type { JobDetailsOutput } from "../../services/JobService";
import type { JobStatus } from "../../services/JobStatusService";
import { getWorkModelLabel } from "../../services/JobService";
import { ArchiveIcon, UnarchiveIcon, TrashIcon, CommentIcon } from "../icons/Icons";

interface JobHeaderProps {
    job: JobDetailsOutput;
    availableStatuses: JobStatus[];
    onChangeStatus: (status: JobStatus) => void;
    onUpdateJob: (updater: (prev: JobDetailsOutput) => JobDetailsOutput) => void;
    onDeleteJob: () => void;
    onToggleArchiveJob: (isArchived: boolean) => void;
    commentsCount?: number;
}

export function JobHeader({ job, availableStatuses, onChangeStatus, onUpdateJob, onDeleteJob, onToggleArchiveJob, commentsCount }: JobHeaderProps) {
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editTitle, setEditTitle] = useState("");

    const handleSaveTitle = () => {
        if (editTitle.trim()) {
            onUpdateJob(prev => ({ ...prev, title: editTitle.trim() }));
        }
        setIsEditingTitle(false);
    };

    return (
        <div className="flex justify-between items-start mb-8">
            <div>
                {isEditingTitle ? (
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            className="bg-slate-800 border border-slate-600 text-slate-200 text-3xl font-semibold rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                            autoFocus
                        />
                        <button onClick={() => setIsEditingTitle(false)} className="text-sm text-slate-400 hover:text-white">Cancelar</button>
                        <button onClick={handleSaveTitle} className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Salvar</button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 group flex-wrap">
                        <h1 className="text-3xl font-semibold text-white">{job.title}</h1>
                        {job.isArchived && (
                            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
                                <UnarchiveIcon size="12" />
                                Arquivada
                            </span>
                        )}
                        <button 
                            onClick={() => { setEditTitle(job.title); setIsEditingTitle(true); }}
                            className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            Editar
                        </button>
                    </div>
                )}
                <p className="text-slate-400 mt-1 flex items-center gap-2">
                    <span>{job.company}</span>
                    <span>•</span>
                    <span>{getWorkModelLabel(job.workModel)}</span>
                    {commentsCount !== undefined && (
                        <>
                            <span>•</span>
                            <span className="flex items-center gap-1.5 text-sky-400">
                                <CommentIcon size="16" />
                                {commentsCount} {commentsCount === 1 ? 'comentário' : 'comentários'}
                            </span>
                        </>
                    )}
                </p>
            </div>
            
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => onToggleArchiveJob(!job.isArchived)}
                    title={job.isArchived ? "Desarquivar Vaga" : "Arquivar Vaga"}
                    className="p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-md transition-colors"
                >
                    {job.isArchived ? <UnarchiveIcon size="18" /> : <ArchiveIcon size="18" />}
                </button>
                <button 
                    onClick={onDeleteJob}
                    title="Excluir Vaga"
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-md transition-colors"
                >
                    <TrashIcon size="18" />
                </button>

                {isEditingStatus ? (
                    <div className="flex items-center gap-2">
                        <select 
                            className="bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-blue-500"
                            value={job.status.id}
                            onChange={e => {
                                const selectedId = Number(e.target.value);
                                const selectedStatus = availableStatuses.find(s => s.id === selectedId);
                                if (selectedStatus) {
                                    onChangeStatus(selectedStatus);
                                }
                                setIsEditingStatus(false);
                            }}
                            onBlur={() => setIsEditingStatus(false)}
                            autoFocus
                        >
                            {availableStatuses.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div 
                        className="bg-blue-600/20 text-blue-400 border border-blue-600/50 px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-600/30 transition-colors flex items-center gap-2"
                        onClick={() => setIsEditingStatus(true)}
                        title="Clique para alterar o status"
                    >
                        {job.status.name}
                        <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </div>
                )}
            </div>
        </div>
    );
}
