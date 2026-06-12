import { useState } from "react";
import type { JobDetailsOutput } from "../../services/JobService";
import type { JobStatus } from "../../services/JobStatusService";
import { getWorkModelLabel } from "../../services/JobService";

interface JobHeaderProps {
    job: JobDetailsOutput;
    availableStatuses: JobStatus[];
    onChangeStatus: (status: JobStatus) => void;
    onUpdateJob: (updater: (prev: JobDetailsOutput) => JobDetailsOutput) => void;
    onDeleteJob: () => void;
    onToggleArchiveJob: (isArchived: boolean) => void;
}

export function JobHeader({ job, availableStatuses, onChangeStatus, onUpdateJob, onDeleteJob, onToggleArchiveJob }: JobHeaderProps) {
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 8v13H3V8"></path>
                                    <path d="M1 3h22v5H1z"></path>
                                    <path d="M10 12h4"></path>
                                </svg>
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
                <p className="text-slate-400 mt-1">
                    {job.company} • {getWorkModelLabel(job.workModel)}
                </p>
            </div>
            
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => onToggleArchiveJob(!job.isArchived)}
                    title={job.isArchived ? "Desarquivar Vaga" : "Arquivar Vaga"}
                    className="p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-md transition-colors"
                >
                    {job.isArchived ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 8v13H3V8"></path>
                            <path d="M1 3h22v5H1z"></path>
                            <path d="M10 12h4"></path>
                            <path d="m12 16 3-3-3-3-3 3z"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="21 8 21 21 3 21 3 8"></polyline>
                            <rect x="1" y="3" width="22" height="5"></rect>
                            <line x1="10" y1="12" x2="14" y2="12"></line>
                        </svg>
                    )}
                </button>
                <button 
                    onClick={onDeleteJob}
                    title="Excluir Vaga"
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-md transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
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
