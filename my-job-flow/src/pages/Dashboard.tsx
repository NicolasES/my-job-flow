import { KanbanColumn } from "../components/KanbanColumn";


const mockJobs = [
    { id: 1, title: "React Developer", company: "Globant", location: "São Paulo, Híbrido", date: "15 Out" },
    { id: 2, title: "Frontend Engineer", company: "Nubank", location: "Remote", date: "14 Out" },
    { id: 3, title: "UI/UX Designer", company: "Mercado Livre", location: "São Paulo", date: "12 Out" },
    { id: 4, title: "Backend Engineer", company: "Stone", location: "São Paulo", date: "11 Out" },
];


function Dashboard() {
    return (
        <div className="flex flex-col h-full p-8">
            {/* header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white">Meu Quadro de Vagas</h1>
                <p className="text-slate-400 mt-1">Painel de Candidaturas</p>
            </div>

            {/* Container do Kanban (Rola para o lado se houver muitas colunas) */}
            <div className="flex-1 overflow-x-auto custom-scrollbar flex gap-6 pb-4">

                {/* EXEMPLO DE COLUNA 1 */}
                <KanbanColumn jobs={mockJobs} title="Candidatura Enviada" />

                {/* EXEMPLO DE COLUNA 2 */}
                <KanbanColumn jobs={mockJobs} title="Entrevista Inicial" />

            </div>
        </div>
    )
}

export default Dashboard
