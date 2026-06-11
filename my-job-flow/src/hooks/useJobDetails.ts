import { useState, useEffect } from "react";
import { JobService } from "../services/JobService";
import type { JobDetailsOutput } from "../services/JobService";
import type { ContactItem } from "../components/form/DynamicContactList";
import type { LinkItem } from "../components/form/DynamicLinkList";

export function useJobDetails(id: string | undefined) {
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
        } catch (err: any) {
            console.error("Failed to update job", err);
            setError(err.message || "Falha ao atualizar a vaga");
        }
    };

    const addComment = async (text: string) => {
        if (!job || !text.trim()) return;
        try {
            const newComment = await JobService.addComment(job.id, text);
            setComments([newComment, ...comments]);
        } catch (err: any) {
            console.error("Failed to add comment", err);
            setError(err.message || "Falha ao adicionar comentário");
        }
    };

    const removeComment = async (commentId: number) => {
        if (!job) return;
        try {
            await JobService.deleteComment(job.id, commentId);
            setComments(comments.filter(c => c.id !== commentId));
        } catch (err: any) {
            console.error("Failed to remove comment", err);
            setError(err.message || "Falha ao remover comentário");
        }
    };

    const editComment = async (commentId: number, text: string) => {
        if (!job) return;
        try {
            await JobService.updateComment(job.id, commentId, text);
            setComments(comments.map(c => c.id === commentId ? { ...c, text } : c));
        } catch (err: any) {
            console.error("Failed to edit comment", err);
            setError(err.message || "Falha ao editar comentário");
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
        } catch (err: any) {
            console.error("Failed to add skill", err);
            setError(err.message || "Falha ao adicionar competência");
        }
    };

    const changeStatus = async (status: { id: number; name: string; order: number }) => {
        if (!job) return;
        try {
            await JobService.changeStatus(job.id, status.id);
            setJob(prev => prev ? { ...prev, status } : prev);
        } catch (err: any) {
            console.error("Failed to change status", err);
            setError(err.message || "Falha ao atualizar o status");
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
        } catch (err: any) {
            console.error("Failed to remove skill", err);
            setError(err.message || "Falha ao remover competência");
        }
    };

    const addContact = async (contact: { name: string; role?: string; linkedin?: string; phone?: string }) => {
        if (!job) return;
        try {
            const addedContact = await JobService.addContact(job.id, contact);
            setJob(prev => prev ? { ...prev, contacts: [...(prev.contacts || []), addedContact] } : prev);
        } catch (err: any) {
            console.error("Failed to add contact", err);
            setError(err.message || "Falha ao adicionar contato");
        }
    };

    const updateContact = async (contactId: number, contact: { name?: string; role?: string; linkedin?: string; phone?: string }) => {
        if (!job) return;
        try {
            await JobService.updateContact(job.id, contactId, contact);
            setJob(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    contacts: (prev.contacts || []).map(c => c.id === contactId ? { ...c, ...contact } : c)
                };
            });
        } catch (err: any) {
            console.error("Failed to update contact", err);
            setError(err.message || "Falha ao atualizar contato");
        }
    };

    const deleteContact = async (contactId: number) => {
        if (!job) return;
        try {
            await JobService.deleteContact(job.id, contactId);
            setJob(prev => prev ? { ...prev, contacts: (prev.contacts || []).filter(c => c.id !== contactId) } : prev);
        } catch (err: any) {
            console.error("Failed to delete contact", err);
            setError(err.message || "Falha ao excluir contato");
        }
    };

    const addLink = async (link: { title: string; url: string }) => {
        if (!job) return;
        try {
            const addedLink = await JobService.addLink(job.id, link);
            setJob(prev => prev ? { ...prev, links: [...(prev.links || []), addedLink] } : prev);
        } catch (err: any) {
            console.error("Failed to add link", err);
            setError(err.message || "Falha ao adicionar link");
        }
    };

    const updateLink = async (linkId: number, link: { title?: string; url?: string }) => {
        if (!job) return;
        try {
            await JobService.updateLink(job.id, linkId, link);
            setJob(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    links: (prev.links || []).map(l => l.id === linkId ? { ...l, ...link } : l)
                };
            });
        } catch (err: any) {
            console.error("Failed to update link", err);
            setError(err.message || "Falha ao atualizar link");
        }
    };

    const deleteLink = async (linkId: number) => {
        if (!job) return;
        try {
            await JobService.deleteLink(job.id, linkId);
            setJob(prev => prev ? { ...prev, links: (prev.links || []).filter(l => l.id !== linkId) } : prev);
        } catch (err: any) {
            console.error("Failed to delete link", err);
            setError(err.message || "Falha ao excluir link");
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
