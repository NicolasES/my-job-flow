import { useState } from "react";
import type { JobDetailsOutput } from "../../services/JobService";
import type { JobStatus } from "../../services/JobStatusService";
import { getWorkModelLabel } from "../../services/JobService";

interface JobHeaderProps {
    job: JobDetailsOutput;
    availableStatuses: JobStatus[];
    onUpdateJob: (updater: (prev: JobDetailsOutput) => JobDetailsOutput) => void;
}

export function JobHeader({ job, availableStatuses, onUpdateJob }: JobHeaderProps) {
    const [isEditingStatus, setIsEditingStatus] = useState(false);

    return (
        <div className="flex justify-between items-start mb-8">
            <div>
                <h1 className="text-3xl font-semibold text-white">{job.title}</h1>
                <p className="text-slate-400 mt-1">
                    {job.company} • {getWorkModelLabel(job.workModel)}
                </p>
            </div>
            
            <div className="flex flex-col gap-3 items-end">
                {isEditingStatus ? (
                    <div className="flex items-center gap-2">
                        <select 
                            className="bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-blue-500"
                            value={job.status.id}
                            onChange={e => {
                                const selectedId = Number(e.target.value);
                                const selectedStatus = availableStatuses.find(s => s.id === selectedId);
                                if (selectedStatus) {
                                    onUpdateJob(prev => ({ ...prev, status: selectedStatus }));
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
