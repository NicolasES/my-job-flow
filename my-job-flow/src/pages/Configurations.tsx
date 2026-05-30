import { useState } from "react";
import { TextInput } from "../components/form/TextInput";
import { SkillTag } from "../components/form/SkillTag";

interface Status {
    id: string;
    name: string;
}

export default function Configurations() {
    const [statuses, setStatuses] = useState<Status[]>([
        { id: '1', name: 'Enviado' },
        { id: '2', name: 'Entrevista Inicial' },
        { id: '3', name: 'Proposta' }
    ]);
    const [newStatusName, setNewStatusName] = useState("");
    const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
    const [editingStatusText, setEditingStatusText] = useState("");

    const handleAddStatus = () => {
        if (!newStatusName.trim()) return;
        const newStatus: Status = { id: Date.now().toString(), name: newStatusName };
        setStatuses([...statuses, newStatus]);
        setNewStatusName("");
    };

    const handleRemoveStatus = (idToRemove: string) => {
        setStatuses(statuses.filter(status => status.id !== idToRemove));
    };

    const handleSaveEditStatus = () => {
        setStatuses(statuses.map(s => s.id === editingStatusId ? { ...s, name: editingStatusText } : s));
        setEditingStatusId(null);
    };

    const handleMoveStatus = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === statuses.length - 1) return;

        const newStatuses = [...statuses];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        [newStatuses[index], newStatuses[targetIndex]] = [newStatuses[targetIndex], newStatuses[index]];
        setStatuses(newStatuses);
    };

    const [skills, setSkills] = useState<string[]>(['React', 'Node.js', 'TypeScript', 'Docker', 'Python', 'Figma']);
    const [newSkillName, setNewSkillName] = useState("");

    const handleAddSkill = () => {
        if (!newSkillName.trim() || skills.includes(newSkillName.trim())) return;
        setSkills([...skills, newSkillName.trim()]);
        setNewSkillName("");
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };


    return (
        <div className="flex flex-col h-full p-8 overflow-y-auto custom-scrollbar">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white">Configurações</h1>
                <p className="text-slate-400 mt-1">Gerencie os status do Kanban e o seu banco de competências global.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl">

                <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h2 className="text-lg font-medium text-white mb-2">Status do Kanban</h2>
                    <p className="text-sm text-slate-400 mb-6">Defina as colunas do seu painel e a ordem delas.</p>

                    <div className="flex gap-2 items-center mb-6">
                        <div className="flex-1">
                            <TextInput
                                id="newStatus"
                                placeholder="Novo status (ex: Desafio Técnico)"
                                value={newStatusName}
                                onChange={(e) => setNewStatusName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddStatus()}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddStatus}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm transition-colors"
                        >
                            Adicionar
                        </button>
                    </div>

                    {/* List of Statuses */}
                    <ul className="flex flex-col gap-2">
                        {statuses.map((status, index) => (
                            <li key={status.id} className="flex items-center justify-between bg-slate-900 border border-slate-600 p-3 rounded-md transition-colors hover:border-slate-500">
                                <div className="flex items-center gap-3 w-full">

                                    {/* Order Arrows */}
                                    <div className="flex flex-col text-slate-500">
                                        <button onClick={() => handleMoveStatus(index, 'up')} className="hover:text-white leading-none mb-1 disabled:opacity-30" disabled={index === 0}>▲</button>
                                        <button onClick={() => handleMoveStatus(index, 'down')} className="hover:text-white leading-none disabled:opacity-30" disabled={index === statuses.length - 1}>▼</button>
                                    </div>

                                    {/* Name or Input if Editing */}
                                    {editingStatusId === status.id ? (
                                        <input
                                            autoFocus
                                            className="bg-slate-800 text-white px-2 py-1 border border-blue-500 rounded-md flex-1 focus:outline-none"
                                            value={editingStatusText}
                                            onChange={(e) => setEditingStatusText(e.target.value)}
                                            onBlur={handleSaveEditStatus}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEditStatus()}
                                        />
                                    ) : (
                                        <span
                                            className="text-slate-200 font-medium flex-1 cursor-pointer hover:text-blue-400 transition-colors"
                                            onClick={() => {
                                                setEditingStatusId(status.id);
                                                setEditingStatusText(status.name);
                                            }}
                                            title="Clique para editar"
                                        >
                                            {status.name}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleRemoveStatus(status.id)}
                                    className="text-slate-400 hover:text-red-400 text-lg leading-none ml-4"
                                    aria-label="Delete status"
                                >
                                    &times;
                                </button>
                            </li>
                        ))}
                        {statuses.length === 0 && <p className="text-slate-500 text-sm text-center py-4">Nenhum status cadastrado.</p>}
                    </ul>
                </section>

                <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h2 className="text-lg font-medium text-white mb-2">Banco de Competências</h2>
                    <p className="text-sm text-slate-400 mb-6">Suas skills cadastradas globalmente no sistema.</p>

                    <div className="flex gap-2 items-center mb-6">
                        <div className="flex-1">
                            <TextInput
                                id="newSkill"
                                placeholder="Nova competência (ex: GraphQL)"
                                value={newSkillName}
                                onChange={(e) => setNewSkillName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddSkill}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm transition-colors"
                        >
                            Adicionar
                        </button>
                    </div>

                    <div className="bg-slate-900 border border-slate-600 rounded-md p-4 flex flex-wrap gap-2 min-h-[150px] content-start">
                        {skills.map(skill => (
                            <SkillTag
                                key={skill}
                                label={skill}
                                onRemove={() => handleRemoveSkill(skill)}
                            />
                        ))}
                        {skills.length === 0 && <p className="text-slate-500 text-sm w-full text-center mt-4">Nenhuma competência cadastrada.</p>}
                    </div>
                </section>

            </div>
        </div>
    )
}
