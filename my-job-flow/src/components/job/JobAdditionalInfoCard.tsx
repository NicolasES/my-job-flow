import { useState } from "react";
import { TextInput } from "../form/TextInput";
import { SelectInput } from "../form/SelectInput";
import { WORK_MODEL_OPTIONS, getWorkModelLabel } from "../../services/JobService";
import type { JobDetailsOutput } from "../../services/JobService";

interface JobAdditionalInfoCardProps {
    job: JobDetailsOutput;
    onUpdateJob: (updater: (prev: JobDetailsOutput) => JobDetailsOutput) => void;
}

export function JobAdditionalInfoCard({ job, onUpdateJob }: JobAdditionalInfoCardProps) {
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [editInfo, setEditInfo] = useState({
        company: "",
        workModel: "",
        salary: "",
        appliedAt: ""
    });

    const handleEditClick = () => {
        setEditInfo({
            company: job.company,
            workModel: job.workModel,
            salary: job.salary ? job.salary.toString() : "",
            appliedAt: job.appliedAt ? job.appliedAt.split('T')[0] : ""
        }); 
        setIsEditingInfo(true); 
    };

    const handleSaveInfo = () => {
        onUpdateJob(prev => ({
            ...prev,
            company: editInfo.company,
            workModel: editInfo.workModel,
            salary: editInfo.salary ? parseFloat(editInfo.salary) : null,
            appliedAt: editInfo.appliedAt ? new Date(`${editInfo.appliedAt}T00:00:00Z`).toISOString() : prev.appliedAt
        }));
        setIsEditingInfo(false);
    };

    return (
        <section className="bg-slate-800 p-6 rounded-lg border border-slate-700 relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-white">Informações Adicionais</h2>
                {!isEditingInfo ? (
                    <button 
                        onClick={handleEditClick} 
                        className="text-sm text-blue-400 hover:text-blue-300"
                    >
                        Editar
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => setIsEditingInfo(false)} className="px-3 py-1 text-sm text-slate-300 hover:text-white">Cancelar</button>
                        <button onClick={handleSaveInfo} className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
                    </div>
                )}
            </div>

            {isEditingInfo ? (
                <div className="flex flex-col gap-4">
                    <TextInput 
                        label="Empresa" 
                        id="edit-company"
                        value={editInfo.company} 
                        onChange={e => setEditInfo({...editInfo, company: e.target.value})} 
                    />
                    <SelectInput 
                        label="Modelo de Trabalho" 
                        id="edit-workModel"
                        options={WORK_MODEL_OPTIONS}
                        value={editInfo.workModel} 
                        onChange={e => setEditInfo({...editInfo, workModel: e.target.value})} 
                    />
                    <TextInput 
                        label="Salário" 
                        id="edit-salary"
                        type="number"
                        value={editInfo.salary} 
                        onChange={e => setEditInfo({...editInfo, salary: e.target.value})} 
                    />
                    <TextInput 
                        label="Data de Candidatura" 
                        id="edit-appliedAt"
                        type="date"
                        value={editInfo.appliedAt} 
                        onChange={e => setEditInfo({...editInfo, appliedAt: e.target.value})} 
                    />
                </div>
            ) : (
                <ul className="text-sm text-slate-300 flex flex-col gap-3">
                    <li className="flex flex-col">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Empresa</span>
                        <span className="font-medium text-white">{job.company}</span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Modelo de Trabalho</span>
                        <span>{getWorkModelLabel(job.workModel)}</span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Salário</span>
                        <span>{job.salary ? `R$ ${job.salary.toLocaleString('pt-BR')}` : 'Não informado'}</span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Data de Candidatura</span>
                        <span>{job.appliedAt ? job.appliedAt.split('T')[0].split('-').reverse().join('/') : 'Não informado'}</span>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Registrado no sistema em</span>
                        <span>{new Date(job.createdAt).toLocaleDateString('pt-BR')}</span>
                    </li>
                </ul>
            )}
        </section>
    );
}
