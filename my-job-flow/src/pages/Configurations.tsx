import { JobStatusConfig } from "../components/configurations/JobStatusConfig";
import { SkillsConfig } from "../components/configurations/SkillsConfig";

export default function Configurations() {
    return (
        <div className="flex flex-col h-full p-8 overflow-y-auto custom-scrollbar">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white">Configurações</h1>
                <p className="text-slate-400 mt-1">Gerencie os status do Kanban e o seu banco de competências global.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl">
                <JobStatusConfig />
                <SkillsConfig />
            </div>
        </div>
    )
}
