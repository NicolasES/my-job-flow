import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useJobDetails } from "../hooks/useJobDetails";

import { SkillService } from "../services/SkillService";
import type { Skill } from "../services/SkillService";
import { JobStatusService } from "../services/JobStatusService";
import type { JobStatus } from "../services/JobStatusService";

import { JobHeader } from "../components/job/JobHeader";
import { JobDescriptionCard } from "../components/job/JobDescriptionCard";
import { JobAdditionalInfoCard } from "../components/job/JobAdditionalInfoCard";
import { JobCommentsCard } from "../components/job/JobCommentsCard";
import { JobSkillsCard } from "../components/job/JobSkillsCard";

import { JobContactsCard } from "../components/job/JobContactsCard";
import { JobLinksCard } from "../components/job/JobLinksCard";

export default function JobDetails() {
    const { id } = useParams<{ id: string }>();

    const {
        job,
        loading,
        error,
        comments,
        updateJob,
        addComment,
        removeComment,
        editComment,
        addSkill,
        removeSkill,
        changeStatus,
        addContact,
        updateContact,
        deleteContact,
        addLink,
        updateLink,
        deleteLink
    } = useJobDetails(id);

    const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
    const [availableStatuses, setAvailableStatuses] = useState<JobStatus[]>([]);

    useEffect(() => {
        Promise.all([
            SkillService.findAll(),
            JobStatusService.findAll()
        ]).then(([skills, statuses]) => {
            setAvailableSkills(skills);
            setAvailableStatuses(statuses.sort((a, b) => a.order - b.order));
        });
    }, []);

    const handleCreateSkill = async (name: string): Promise<Skill> => {
        const newSkill = await SkillService.create(name);
        setAvailableSkills(prev => [...prev, newSkill]);
        return newSkill;
    };

    if (loading) {
        return <div className="flex items-center justify-center h-full text-slate-300">Carregando detalhes da vaga...</div>;
    }

    if (error || !job) {
        return <div className="flex items-center justify-center h-full text-red-400">Erro: {error || "Vaga não encontrada"}</div>;
    }

    return (
        <div className="flex flex-col h-full p-8 overflow-y-auto custom-scrollbar">

            <JobHeader 
                job={job} 
                availableStatuses={availableStatuses} 
                onChangeStatus={changeStatus} 
                onUpdateJob={updateJob}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <JobDescriptionCard 
                        job={job} 
                        onUpdateJob={updateJob} 
                    />

                    <JobCommentsCard 
                        comments={comments} 
                        onAddComment={addComment} 
                        onRemoveComment={removeComment} 
                        onEditComment={editComment} 
                    />
                </div>

                <div className="flex flex-col gap-6">
                    <JobAdditionalInfoCard 
                        job={job} 
                        onUpdateJob={updateJob} 
                    />

                    <JobSkillsCard 
                        job={job} 
                        availableSkills={availableSkills} 
                        onAddSkill={addSkill}
                        onRemoveSkill={removeSkill}
                        onCreateSkill={handleCreateSkill} 
                    />

                    <JobContactsCard 
                        contacts={job.contacts || []} 
                        onAddContact={addContact} 
                        onUpdateContact={updateContact}
                        onDeleteContact={deleteContact} 
                    />
                    <JobLinksCard 
                        links={job.links || []} 
                        onAddLink={addLink} 
                        onUpdateLink={updateLink} 
                        onDeleteLink={deleteLink} 
                    />
                </div>
            </div>
        </div>
    );
}
