import { useState, useEffect, useCallback } from "react";
import { JobService } from "../services/JobService";
import { JobStatusService } from "../services/JobStatusService";
import { JobCard, type JobCardData } from "../components/JobCard";
import { useToast } from "../contexts/ToastContext";
import { getErrorMessage } from "../utils/errorMessages";

export default function ArchivedJobs() {
    const [archivedJobs, setArchivedJobs] = useState<JobCardData[]>([]);
    const [availableStatuses, setAvailableStatuses] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterText, setFilterText] = useState("");
    const toast = useToast();

    const loadData = useCallback(async (query?: string) => {
        setLoading(true);
        try {
            const [jobsData, statusesData] = await Promise.all([
                JobService.getArchived(query),
                JobStatusService.findAll()
            ]);
            setArchivedJobs(jobsData);
            setAvailableStatuses(statusesData);
        } catch (error: any) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            loadData(filterText);
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [filterText, loadData]);



    const handleDeleteJob = async (id: number) => {
        try {
            await JobService.delete(id);
            setArchivedJobs(prev => prev.filter(job => job.id !== id));
            toast.success("Vaga arquivada excluída com sucesso.");
        } catch (error: any) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleToggleArchive = async (id: number, _currentIsArchived: boolean) => {
        try {
            // Since it's in the archived list, toggling it means UNARCHIVING (isArchived = false)
            await JobService.toggleArchive(id, false);
            setArchivedJobs(prev => prev.filter(job => job.id !== id));
            toast.success("Vaga desarquivada! Ela voltou para o Dashboard.");
        } catch (error: any) {
            toast.error(getErrorMessage(error));
        }
    };

    const handleMoveJob = async (id: number, newStatusId: number) => {
        try {
            await JobService.changeStatus(id, newStatusId);
            setArchivedJobs(prev => prev.map(job => 
                job.id === id ? { ...job, statusId: newStatusId } : job
            ));
            toast.success("Status atualizado.");
        } catch (error: any) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <div className="flex-1 overflow-auto bg-slate-900 p-8 text-slate-100">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Cabeçalho e Busca */}
                <div className="flex justify-between items-center bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Vagas Arquivadas</h1>
                        <p className="text-slate-400">Aqui ficam as vagas que você ocultou do Dashboard principal.</p>
                    </div>

                    <div className="flex gap-2 w-96">
                        <input
                            type="text"
                            placeholder="Buscar vagas arquivadas..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 min-w-[250px]"
                        />
                    </div>
                </div>

                {/* Grid de Cards */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : archivedJobs.length === 0 ? (
                    <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-slate-700/50">
                        <h3 className="text-xl font-medium text-slate-300 mb-2">Nenhuma vaga encontrada</h3>
                        <p className="text-slate-500">
                            {filterText ? "Nenhuma vaga corresponde à sua busca." : "Você não possui vagas arquivadas no momento."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {archivedJobs.map(job => (
                            <JobCard
                                key={job.id}
                                jobData={{ ...job, isArchived: true }}
                                availableStatuses={availableStatuses}
                                onMoveJob={handleMoveJob}
                                onDeleteJob={handleDeleteJob}
                                onToggleArchiveJob={handleToggleArchive}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
