import { useState, useEffect } from "react";
import { JobService } from "../services/JobService";
import type { JobDetailsOutput } from "../services/JobService";
import type { ContactItem } from "../components/form/DynamicContactList";
import type { LinkItem } from "../components/form/DynamicLinkList";
import { useToast } from "../contexts/ToastContext";

export function useJobDetails(id: string | undefined) {
    const toast = useToast();
    const [job, setJob] = useState<JobDetailsOutput | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [comments, setComments] = useState<any[]>([]);
    const [contacts, setContacts] = useState<ContactItem[]>([]);
    const [links, setLinks] = useState<LinkItem[]>([]);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        JobService.getDetails(Number(id))
            .then((data) => {
                setJob(data);
                setComments(data.comments);
                setContacts(data.contacts.map(c => ({
                    id: c.id,
                    name: c.name,
                    role: c.role || "",
                    linkedin: c.linkedin || "",
                    phone: c.phone || ""
                })));
                setLinks(data.links);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const updateJob = async (updater: (prev: JobDetailsOutput) => JobDetailsOutput) => {
        if (!job) return;
        const updatedJob = updater(job);
        
        try {
            await JobService.update(updatedJob.id, {
                title: updatedJob.title,
                company: updatedJob.company,
                workModel: updatedJob.workModel,
                statusId: updatedJob.status.id,
                description: updatedJob.description,
                appliedAt: updatedJob.appliedAt,
                salary: updatedJob.salary
            });
            setJob(updatedJob);
            toast.success("Vaga atualizada com sucesso");
        } catch (err: any) {
            console.error("Failed to update job", err);
            toast.error(err.message || "Falha ao atualizar a vaga");
        }
    };

    const addComment = async (text: string) => {
        if (!job || !text.trim()) return;
        try {
            const newComment = await JobService.addComment(job.id, text);
            setComments([newComment, ...comments]);
            toast.success("Comentário adicionado");
        } catch (err: any) {
            console.error("Failed to add comment", err);
            toast.error(err.message || "Falha ao adicionar comentário");
        }
    };

    const removeComment = async (commentId: number) => {
        if (!job) return;
        try {
            await JobService.deleteComment(job.id, commentId);
            setComments(comments.filter(c => c.id !== commentId));
            toast.success("Comentário excluído");
        } catch (err: any) {
            console.error("Failed to remove comment", err);
            toast.error(err.message || "Falha ao remover comentário");
        }
    };

    const editComment = async (commentId: number, text: string) => {
        if (!job) return;
        try {
            await JobService.updateComment(job.id, commentId, text);
            setComments(comments.map(c => c.id === commentId ? { ...c, text } : c));
            toast.success("Comentário editado");
        } catch (err: any) {
            console.error("Failed to edit comment", err);
            toast.error(err.message || "Falha ao editar comentário");
        }
    };

    const addSkill = async (type: 'mandatory' | 'recommended', skill: {id: number, name: string}) => {
        if (!job) return;
        try {
            await JobService.addSkill(job.id, type, skill.id);
            setJob(prev => {
                if (!prev) return prev;
                if (type === 'mandatory') {
                    return { ...prev, mandatorySkills: [...prev.mandatorySkills, skill] };
                } else {
                    return { ...prev, recommendedSkills: [...prev.recommendedSkills, skill] };
                }
            });
            toast.success("Competência adicionada");
        } catch (err: any) {
            console.error("Failed to add skill", err);
            toast.error(err.message || "Falha ao adicionar competência");
        }
    };

    const changeStatus = async (status: { id: number; name: string; order: number }) => {
        if (!job) return;
        try {
            await JobService.changeStatus(job.id, status.id);
            setJob(prev => prev ? { ...prev, status } : prev);
            toast.success("Status atualizado");
        } catch (err: any) {
            console.error("Failed to change status", err);
            toast.error(err.message || "Falha ao atualizar o status");
        }
    };

    const removeSkill = async (type: 'mandatory' | 'recommended', skillId: number) => {
        if (!job) return;
        try {
            await JobService.removeSkill(job.id, type, skillId);
            setJob(prev => {
                if (!prev) return prev;
                if (type === 'mandatory') {
                    return { ...prev, mandatorySkills: prev.mandatorySkills.filter(s => s.id !== skillId) };
                } else {
                    return { ...prev, recommendedSkills: prev.recommendedSkills.filter(s => s.id !== skillId) };
                }
            });
            toast.success("Competência removida");
        } catch (err: any) {
            console.error("Failed to remove skill", err);
            toast.error(err.message || "Falha ao remover competência");
        }
    };

    const addContact = async (contact: { name: string; role?: string; linkedin?: string; phone?: string }) => {
        if (!job) return;
        try {
            const addedContact = await JobService.addContact(job.id, contact);
            setContacts(prev => [...prev, addedContact]);
            toast.success("Contato adicionado");
        } catch (err: any) {
            console.error("Failed to add contact", err);
            toast.error(err.message || "Falha ao adicionar contato");
        }
    };

    const updateContact = async (contactId: number, contactPayload: { name?: string; role?: string; linkedin?: string; phone?: string }) => {
        if (!job) return;
        try {
            await JobService.updateContact(job.id, contactId, contactPayload);
            setContacts(prev => prev.map(c => 
                c.id === contactId ? { ...c, ...contactPayload } : c
            ));
            toast.success("Contato atualizado");
        } catch (err: any) {
            console.error("Failed to update contact", err);
            toast.error(err.message || "Falha ao atualizar contato");
        }
    };

    const deleteContact = async (contactId: number) => {
        if (!job) return;
        try {
            await JobService.deleteContact(job.id, contactId);
            setContacts(prev => prev.filter(c => c.id !== contactId));
            toast.success("Contato excluído");
        } catch (err: any) {
            console.error("Failed to delete contact", err);
            toast.error(err.message || "Falha ao remover contato");
        }
    };

    const addLink = async (link: { title: string; url: string }) => {
        if (!job) return;
        try {
            const addedLink = await JobService.addLink(job.id, link);
            setLinks(prev => [...prev, addedLink]);
            toast.success("Link adicionado");
        } catch (err: any) {
            console.error("Failed to add link", err);
            toast.error(err.message || "Falha ao adicionar link");
        }
    };

    const updateLink = async (linkId: number, linkPayload: { title?: string; url?: string }) => {
        if (!job) return;
        try {
            await JobService.updateLink(job.id, linkId, linkPayload);
            setLinks(prev => prev.map(l => 
                l.id === linkId ? { ...l, ...linkPayload } : l
            ));
            toast.success("Link atualizado");
        } catch (err: any) {
            console.error("Failed to update link", err);
            toast.error(err.message || "Falha ao atualizar link");
        }
    };

    const deleteLink = async (linkId: number) => {
        if (!job) return;
        try {
            await JobService.deleteLink(job.id, linkId);
            setLinks(prev => prev.filter(l => l.id !== linkId));
            toast.success("Link excluído");
        } catch (err: any) {
            console.error("Failed to delete link", err);
            toast.error(err.message || "Falha ao remover link");
        }
    };

    return {
        job,
        loading,
        error,
        comments,
        contacts,
        links,
        setContacts,
        setLinks,
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
    };
}
