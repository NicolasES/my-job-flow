import { useState, useEffect } from 'react'
import type { SyntheticEvent } from 'react'

import { SelectInput } from "../components/form/SelectInput"
import { SkillAutocomplete } from "../components/form/SkillAutocomplete"
import { SkillTag } from "../components/form/SkillTag"
import { TextAreaInput } from "../components/form/TextAreaInput"
import { TextInput } from "../components/form/TextInput"
import { DynamicContactList } from "../components/form/DynamicContactList"
import type { ContactItem } from "../components/form/DynamicContactList"
import { DynamicLinkList } from "../components/form/DynamicLinkList"
import type { LinkItem } from "../components/form/DynamicLinkList"

import { JobService, WORK_MODEL_OPTIONS } from "../services/JobService";
import { SkillService } from '../services/SkillService'
import type { Skill } from '../services/SkillService'

export default function NewJob() {
    const [availableSkills, setAvailableSkills] = useState<Skill[]>([])
    const [mandatorySkills, setMandatorySkills] = useState<Skill[]>([])
    const [recommendedSkills, setRecommendedSkills] = useState<Skill[]>([])

    const [contacts, setContacts] = useState<ContactItem[]>([])
    const [links, setLinks] = useState<LinkItem[]>([])

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMsg, setSuccessMsg] = useState("")

    useEffect(() => {
        SkillService.findAll()
            .then(setAvailableSkills)
            .catch(err => console.error("Erro ao carregar skills", err))
    }, [])

    const handleCreateSkill = async (name: string): Promise<Skill> => {
        const newSkill = await SkillService.create(name);
        setAvailableSkills(prev => [...prev, newSkill]);
        return newSkill;
    }

    const addMandatorySkill = (skill: Skill) => {
        if (!mandatorySkills.some(s => s.id === skill.id)) {
            setMandatorySkills([...mandatorySkills, skill])
        }
    }

    const addRecommendedSkill = (skill: Skill) => {
        if (!recommendedSkills.some(s => s.id === skill.id)) {
            setRecommendedSkills([...recommendedSkills, skill])
        }
    }

    const removeMandatorySkill = (skillIdToRemove: number) => {
        setMandatorySkills(mandatorySkills.filter(s => s.id !== skillIdToRemove));
    }

    const removeRecommendedSkill = (skillIdToRemove: number) => {
        setRecommendedSkills(recommendedSkills.filter(s => s.id !== skillIdToRemove));
    }

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMsg("");

        const formData = new FormData(e.currentTarget);

        const salaryVal = formData.get('salary')?.toString() || "";
        const data = {
            title: formData.get('title') as string,
            company: formData.get('company') as string,
            workModel: formData.get('workModel') as string,
            salary: salaryVal ? parseFloat(salaryVal) : null,
            description: formData.get('description') as string,
            appliedAt: formData.get('appliedAt') as string,
            contacts: contacts.map(c => ({ name: c.name, role: c.role || null, linkedin: c.linkedin || null, phone: c.phone || null })),
            links: links.map(l => ({ title: l.title, url: l.url })),
            mandatorySkillsIds: mandatorySkills.map(s => s.id),
            recommendedSkillsIds: recommendedSkills.map(s => s.id)
        };

        try {
            await JobService.create(data);
            setSuccessMsg("Vaga criada com sucesso!");
        } catch (err: any) {
            alert(`Erro ao criar vaga: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="flex flex-col h-full p-8 overflow-y-auto custom-scrollbar">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white">Cadastrar Nova Vaga</h1>
                <p className="text-slate-400 mt-1">Registre as informações de uma nova candidatura</p>
                {successMsg && <p className="text-green-400 mt-4 font-medium">{successMsg}</p>}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl">

                {/* Left Column */}
                <div className="flex flex-col gap-6">

                    {/* Card: Job Data */}
                    <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-lg font-medium text-white mb-4">Dados da Vaga</h2>

                        <div className='flex flex-col gap-4'>
                            <TextInput
                                label="Título da Vaga *"
                                id="title"
                                name="title"
                                required
                                placeholder="ex: Desenvolvedor React Sênior"
                            />

                            <TextAreaInput
                                label="Descrição *"
                                id="description"
                                name="description"
                                required
                                rows={6}
                                placeholder="Descrição da vaga aqui..."
                            />

                            <TextInput
                                label="Salário Ofertado (BRL)"
                                id="salary"
                                name="salary"
                                type="number"
                                placeholder="ex: 15000"
                            />

                            <TextInput
                                type="date"
                                label="Data de Candidatura *"
                                id="appliedAt"
                                name="appliedAt"
                                required
                                defaultValue={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </section>
                    {/* Card: Competencies */}
                    <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-lg font-medium text-white mb-4">Competências</h2>

                        {/* Mandatory Skills */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Obrigatórias</label>
                            <div className="bg-slate-900 border border-slate-600 rounded-md p-3 flex flex-wrap gap-2 items-center min-h-[60px]">
                                {mandatorySkills.map(skill => (
                                    <SkillTag
                                        key={skill.id}
                                        label={skill.name}
                                        onRemove={() => removeMandatorySkill(skill.id)}
                                    />
                                ))}

                                <SkillAutocomplete
                                    availableSkills={availableSkills}
                                    alreadySelected={[...mandatorySkills, ...recommendedSkills]}
                                    onAddSkill={addMandatorySkill}
                                    onCreateSkill={handleCreateSkill}
                                />
                            </div>
                        </div>

                        {/* Recommended Skills */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Recomendadas</label>
                            <div className="bg-slate-900 border border-slate-600 rounded-md p-3 flex flex-wrap gap-2 items-center min-h-[60px]">
                                {recommendedSkills.map(skill => (
                                    <SkillTag
                                        key={skill.id}
                                        label={skill.name}
                                        onRemove={() => removeRecommendedSkill(skill.id)}
                                    />
                                ))}

                                <SkillAutocomplete
                                    availableSkills={availableSkills}
                                    alreadySelected={[...mandatorySkills, ...recommendedSkills]}
                                    onAddSkill={addRecommendedSkill}
                                    onCreateSkill={handleCreateSkill}
                                />
                            </div>
                        </div>
                    </section>

                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">

                    {/* Card: Company & Location */}
                    <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-lg font-medium text-white mb-4">Empresa e Localização</h2>

                        <div className='flex flex-col gap-4'>
                            <TextInput
                                label="Empresa *"
                                id="company"
                                name="company"
                                required
                                placeholder="Nome da empresa"
                            />

                            <SelectInput
                                label="Modelo de Trabalho *"
                                id="workModel"
                                name="workModel"
                                required
                                options={WORK_MODEL_OPTIONS}
                            />
                        </div>
                    </section>

                    <DynamicContactList contacts={contacts} onChange={setContacts} />

                    <DynamicLinkList links={links} onChange={setLinks} />

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
                            disabled={isSubmitting}
                            className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        >
                            {isSubmitting ? 'Salvando...' : 'Salvar Vaga'}
                        </button>
                    </div>

                </div>

            </form>
        </div>
    )
}
