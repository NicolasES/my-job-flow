import { useState } from "react";
import { KanbanColumn } from "../components/KanbanColumn";
import type { JobCardData } from "../components/JobCard";

const KANBAN_STATUSES = [
    "Enviado",
    "Entrevista Inicial",
    "Teste Técnico",
    "Proposta",
    "Rejeitado"
];

const INITIAL_JOBS: JobCardData[] = [
    { id: 1, title: "React Developer", company: "Globant", location: "São Paulo, Híbrido", date: "15 Out", status: "Enviado" },
    { id: 11, title: "React Developer", company: "Globant", location: "São Paulo, Híbrido", date: "15 Out", status: "Enviado" },
    { id: 12, title: "React Developer", company: "Globant", location: "São Paulo, Híbrido", date: "15 Out", status: "Enviado" },
    { id: 13, title: "React Developer", company: "Globant", location: "São Paulo, Híbrido", date: "15 Out", status: "Enviado" },
    { id: 14, title: "React Developer", company: "Globant", location: "São Paulo, Híbrido", date: "15 Out", status: "Enviado" },
    { id: 15, title: "React Developer", company: "Globant", location: "São Paulo, Híbrido", date: "15 Out", status: "Enviado" },
    { id: 2, title: "Frontend Engineer", company: "Nubank", location: "Remote", date: "14 Out", status: "Entrevista Inicial" },
    { id: 3, title: "UI/UX Designer", company: "Mercado Livre", location: "São Paulo", date: "12 Out", status: "Enviado" },
    { id: 4, title: "Backend Engineer", company: "Stone", location: "São Paulo", date: "11 Out", status: "Teste Técnico" },
];

function Dashboard() {
    const [jobs, setJobs] = useState<JobCardData[]>(INITIAL_JOBS);

    const handleMoveJob = (jobId: number, newStatus: string) => {
        setJobs(currentJobs =>
            currentJobs.map(job =>
                job.id === jobId ? { ...job, status: newStatus } : job
            )
        );
    };

    return (
        <div className="flex flex-col h-full p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white">Meu Quadro de Vagas</h1>
                <p className="text-slate-400 mt-1">Painel de Candidaturas</p>
            </div>

            {/* Container do Kanban */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar flex gap-6 pb-4">

                {/* 5. Mapeamos as colunas baseado na lista oficial de Status */}
                {KANBAN_STATUSES.map(status => {
                    // 6. Filtramos apenas as vagas que pertencem a esta exata coluna
                    const jobsForThisColumn = jobs.filter(job => job.status === status);

                    return (
                        <KanbanColumn
                            key={status}
                            title={status}
                            jobs={jobsForThisColumn}
                            availableStatuses={KANBAN_STATUSES}
                            onMoveJob={handleMoveJob}
                        />
                    );
                })}

            </div>
        </div>
    )
}

export default Dashboard;
