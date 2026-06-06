import { useState, useEffect } from "react";
import { TextInput } from "../form/TextInput";
import { SkillTag } from "../form/SkillTag";
import { SkillService, type Skill } from "../../services/SkillService";

export function SkillsConfig() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [newSkillName, setNewSkillName] = useState("");

    useEffect(() => {
        const loadSkills = async () => {
            try {
                const data = await SkillService.findAll();
                setSkills(data);
            } catch (err: any) {
                alert(`Erro ao carregar skills: ${err.message}`);
            }
        };
        loadSkills();
    }, []);

    const handleAddSkill = async () => {
        const name = newSkillName.trim();
        if (!name) return;

        if (skills.some(s => s.name.toLowerCase() === name.toLowerCase())) {
            alert('Esta competência já está cadastrada na lista.');
            return;
        }

        try {
            const newSkill = await SkillService.create(name);
            setSkills([...skills, newSkill]);
            setNewSkillName("");
        } catch (err: any) {
            alert(`Erro ao adicionar skill: ${err.message}`);
        }
    };

    const handleRemoveSkill = async (idToRemove: number) => {
        try {
            await SkillService.delete(idToRemove);
            setSkills(skills.filter(skill => skill.id !== idToRemove));
        } catch (err: any) {
            alert(`Erro ao deletar skill: ${err.message}`);
        }
    };

    return (
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
                        key={skill.id}
                        label={skill.name}
                        onRemove={() => handleRemoveSkill(skill.id)}
                    />
                ))}
                {skills.length === 0 && <p className="text-slate-500 text-sm w-full text-center mt-4">Nenhuma competência cadastrada.</p>}
            </div>
        </section>
    );
}
