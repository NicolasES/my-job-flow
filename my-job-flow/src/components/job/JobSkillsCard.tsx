import { SkillTag } from "../form/SkillTag";
import { SkillAutocomplete } from "../form/SkillAutocomplete";
import type { Skill } from "../../services/SkillService";
import type { JobDetailsOutput } from "../../services/JobService";

interface JobSkillsCardProps {
    job: JobDetailsOutput;
    availableSkills: Skill[];
    onUpdateJob: (updater: (prev: JobDetailsOutput) => JobDetailsOutput) => void;
    onCreateSkill: (name: string) => Promise<Skill>;
}

export function JobSkillsCard({ job, availableSkills, onUpdateJob, onCreateSkill }: JobSkillsCardProps) {
    return (
        <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h2 className="text-lg font-medium text-white mb-4">Competências</h2>
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Obrigatórias</h3>
                    <div className="bg-slate-900 border border-slate-600 rounded-md p-3 flex flex-wrap gap-2 items-center min-h-[60px]">
                        {job.mandatorySkills.map(skill => (
                            <SkillTag
                                key={skill.id}
                                label={skill.name}
                                onRemove={() => onUpdateJob(prev => ({ 
                                    ...prev, 
                                    mandatorySkills: prev.mandatorySkills.filter(s => s.id !== skill.id) 
                                }))}
                            />
                        ))}
                        <SkillAutocomplete
                            availableSkills={availableSkills}
                            alreadySelected={[...job.mandatorySkills, ...job.recommendedSkills]}
                            onAddSkill={skill => onUpdateJob(prev => ({ 
                                ...prev, 
                                mandatorySkills: [...prev.mandatorySkills, skill] 
                            }))}
                            onCreateSkill={onCreateSkill}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Recomendadas</h3>
                    <div className="bg-slate-900 border border-slate-600 rounded-md p-3 flex flex-wrap gap-2 items-center min-h-[60px]">
                        {job.recommendedSkills.map(skill => (
                            <SkillTag
                                key={skill.id}
                                label={skill.name}
                                onRemove={() => onUpdateJob(prev => ({ 
                                    ...prev, 
                                    recommendedSkills: prev.recommendedSkills.filter(s => s.id !== skill.id) 
                                }))}
                            />
                        ))}
                        <SkillAutocomplete
                            availableSkills={availableSkills}
                            alreadySelected={[...job.mandatorySkills, ...job.recommendedSkills]}
                            onAddSkill={skill => onUpdateJob(prev => ({ 
                                ...prev, 
                                recommendedSkills: [...prev.recommendedSkills, skill] 
                            }))}
                            onCreateSkill={onCreateSkill}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
