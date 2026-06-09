import { useState } from "react";
import { TextAreaInput } from "../form/TextAreaInput";
import type { JobDetailsOutput } from "../../services/JobService";

interface JobDescriptionCardProps {
    job: JobDetailsOutput;
    onUpdateJob: (updater: (prev: JobDetailsOutput) => JobDetailsOutput) => void;
}

export function JobDescriptionCard({ job, onUpdateJob }: JobDescriptionCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editDescription, setEditDescription] = useState("");

    const handleSave = () => {
        onUpdateJob(prev => ({ ...prev, description: editDescription }));
        setIsEditing(false);
    };

    return (
        <section className="bg-slate-800 p-6 rounded-lg border border-slate-700 relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-white">Descrição da Vaga</h2>
                {!isEditing ? (
                    <button 
                        onClick={() => { setEditDescription(job.description); setIsEditing(true); }} 
                        className="text-sm text-blue-400 hover:text-blue-300"
                    >
                        Editar
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => setIsEditing(false)} className="px-3 py-1 text-sm text-slate-300 hover:text-white">Cancelar</button>
                        <button onClick={handleSave} className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
                    </div>
                )}
            </div>
            {isEditing ? (
                <TextAreaInput 
                    label="" 
                    id="edit-description"
                    rows={8}
                    value={editDescription} 
                    onChange={e => setEditDescription(e.target.value)} 
                />
            ) : (
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {job.description}
                </p>
            )}
        </section>
    );
}
