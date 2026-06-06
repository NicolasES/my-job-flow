import { useState, useEffect } from "react";
import { TextInput } from "../form/TextInput";
import { JobStatusService, type JobStatus } from "../../services/JobStatusService";

export function JobStatusConfig() {
    const [statuses, setStatuses] = useState<JobStatus[]>([]);
    const [newStatusName, setNewStatusName] = useState("");
    const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
    const [editingStatusText, setEditingStatusText] = useState("");

    useEffect(() => {
        const loadStatuses = async () => {
            try {
                const data = await JobStatusService.findAll();
                setStatuses(data.sort((a, b) => a.order - b.order));
            } catch (err: any) {
                alert(`Erro ao carregar status: ${err.message}`);
            }
        };
        loadStatuses();
    }, []);

    const handleAddStatus = async () => {
        if (!newStatusName.trim()) return;
        try {
            const nextOrder = statuses.length > 0 ? Math.max(...statuses.map(s => s.order)) + 1 : 0;
            const newStatus = await JobStatusService.create(newStatusName, nextOrder);
            setStatuses([...statuses, newStatus]);
            setNewStatusName("");
        } catch (err: any) {
            alert(`Erro ao criar status: ${err.message}`);
        }
    };

    const handleRemoveStatus = async (idToRemove: number) => {
        try {
            await JobStatusService.delete(idToRemove);
            setStatuses(statuses.filter(status => status.id !== idToRemove));
        } catch (err: any) {
            alert(`Erro ao deletar status: ${err.message}`);
        }
    };

    const handleSaveEditStatus = async () => {
        if (editingStatusId === null) return;
        try {
            const updated = await JobStatusService.update(editingStatusId, editingStatusText);
            setStatuses(statuses.map(s => s.id === editingStatusId ? updated : s));
            setEditingStatusId(null);
        } catch (err: any) {
            alert(`Erro ao atualizar status: ${err.message}`);
        }
    };

    const handleMoveStatus = async (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === statuses.length - 1) return;

        const newStatuses = [...statuses];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        const currentOrder = newStatuses[index].order;
        const targetOrder = newStatuses[targetIndex].order;

        newStatuses[index].order = targetOrder;
        newStatuses[targetIndex].order = currentOrder;

        newStatuses.sort((a, b) => a.order - b.order);
        setStatuses(newStatuses);

        try {
            const payload = newStatuses.map(s => ({ id: s.id, order: s.order }));
            await JobStatusService.reorder(payload);
        } catch (err: any) {
            alert(`Erro ao reordenar status: ${err.message}`);
        }
    };

    return (
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
    );
}
