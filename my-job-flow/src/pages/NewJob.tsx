import { SelectInput } from "../components/form/SelectInput"
import { SkillTag } from "../components/form/SkillTag"
import { TextAreaInput } from "../components/form/TextAreaInput"
import { TextInput } from "../components/form/TextInput"

const workModelOptions = [
    { value: 'remote', label: 'Remoto' },
    { value: 'hybrid', label: 'Híbrido' },
    { value: 'onsite', label: 'Presencial' },
]

export default function NewJob() {
    return (
        <div className="flex flex-col h-full p-8 overflow-y-auto custom-scrollbar">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white">Cadastrar Nova Vaga</h1>
                <p className="text-slate-400 mt-1">Registre as informações de uma nova candidatura</p>
            </div>

            <form className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl">

                {/* Left Column */}
                <div className="flex flex-col gap-6">

                    {/* Card: Job Data */}
                    <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-lg font-medium text-white mb-4">Dados da Vaga</h2>

                        {/* Using our new reusable component */}
                        <TextInput
                            label="Título da Vaga"
                            id="title"
                            placeholder="ex: Desenvolvedor React Sênior"
                        />

                        <TextAreaInput
                            label="Descrição"
                            id="description"
                            rows={6}
                            placeholder="Descrição da vaga aqui..."
                        />

                        {/* Reusing the component again! */}
                        <TextInput
                            label="Salário Ofertado (BRL)"
                            id="salary"
                            type="number"
                            placeholder="ex: 15000"
                        />

                        <TextInput type="date" label="Data de Candidatura" id="appliedAt" />
                    </section>

                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">

                    {/* Card: Company & Location */}
                    <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-lg font-medium text-white mb-4">Empresa e Localização</h2>

                        <TextInput
                            label="Empresa"
                            id="company"
                            placeholder="Nome da empresa"
                        />

                        <SelectInput
                            label="Modelo de Trabalho"
                            id="workModel"
                            options={workModelOptions}
                        />

                    </section>

                    {/* Card: Competencies */}
                    <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-lg font-medium text-white mb-4">Competências</h2>

                        {/* Mandatory Skills */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Obrigatórias</label>
                            <div className="bg-slate-900 border border-slate-600 rounded-md p-3 flex flex-wrap gap-2 items-center min-h-[60px]">
                                {/* Mocked data */}
                                <SkillTag label="React" />
                                <SkillTag label="Node.js" />

                                {/* Add button placeholder */}
                                <button type="button" className="text-slate-400 hover:text-white px-2 ml-1 text-lg">
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Recommended Skills */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Recomendadas</label>
                            <div className="bg-slate-900 border border-slate-600 rounded-md p-3 flex flex-wrap gap-2 items-center min-h-[60px]">
                                {/* Mocked data */}
                                <SkillTag label="TypeScript" />
                                <SkillTag label="Figma" />

                                <button type="button" className="text-slate-400 hover:text-white px-2 ml-1 text-lg">
                                    +
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-end mt-4">
                        <button
                            type="button"
                            className="px-6 py-2 text-sm font-medium text-slate-300 bg-transparent border border-slate-600 rounded-md hover:bg-slate-800 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Salvar Vaga
                        </button>
                    </div>

                </div>

            </form>
        </div>
    )
}
