import { useState, useEffect, useCallback } from "react";
import { KanbanColumn } from "../components/KanbanColumn";
import { DashboardService, type DashboardColumn } from "../services/DashboardService";
import { JobService } from "../services/JobService";
import { useToast } from "../contexts/ToastContext";

function Dashboard() {
    const [columns, setColumns] = useState<DashboardColumn[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const toast = useToast();

    const fetchJobs = useCallback(async (query?: string) => {
        try {
            setLoading(true);
            const data = await DashboardService.getJobs(query);
            setColumns(data);
        } catch (err: any) {
            toast.error(err.message || "Falha ao carregar vagas do Dashboard.");
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchJobs(search);
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [search, fetchJobs]);

    const handleMoveJob = async (jobId: number, newStatusId: number) => {
        try {
            await JobService.changeStatus(jobId, newStatusId);
            toast.success("Vaga movida com sucesso!");
            fetchJobs(search);
        } catch (err: any) {
            toast.error(err.message || "Falha ao mover a vaga.");
        }
    };

    const handleDeleteJob = async (jobId: number) => {
        try {
            await JobService.delete(jobId);
            toast.success("Vaga excluída com sucesso.");
            fetchJobs(search);
        } catch (err: any) {
            toast.error(err.message || "Falha ao excluir a vaga.");
        }
    };

    const handleToggleArchiveJob = async (jobId: number, isArchived: boolean) => {
        try {
            await JobService.toggleArchive(jobId, isArchived);
            toast.success(isArchived ? "Vaga arquivada com sucesso." : "Vaga desarquivada com sucesso.");
            fetchJobs(search); // will refresh and the archived job will disappear from dashboard
        } catch (err: any) {
            toast.error(err.message || "Falha ao arquivar a vaga.");
        }
    };

    const availableStatuses = columns.map(c => ({ id: c.id, name: c.name }));

    return (
        <div className="flex flex-col h-full p-8">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold text-white">Meu Quadro de Vagas</h1>
                    <p className="text-slate-400 mt-1">Painel de Candidaturas</p>
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 min-w-[250px]"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar flex gap-6 pb-4">
                {loading ? (
                    <div className="text-slate-400 m-auto">Carregando quadro...</div>
                ) : columns.length === 0 ? (
                    <div className="text-slate-400 m-auto">Nenhum status configurado no banco de dados.</div>
                ) : (
                    columns.map(column => (
                        <KanbanColumn
                            key={column.id}
                            title={column.name}
                            jobs={column.jobs}
                            availableStatuses={availableStatuses}
                            onMoveJob={handleMoveJob}
                            onDeleteJob={handleDeleteJob}
                            onToggleArchiveJob={handleToggleArchiveJob}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Dashboard;
