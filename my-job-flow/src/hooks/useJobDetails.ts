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

    const updateJob = (updater: (prev: JobDetailsOutput) => JobDetailsOutput) => {
        if (!job) return;
        setJob(updater(job));
    };

    const addComment = (text: string) => {
        if (!text.trim()) return;
        setComments([{ id: Date.now(), text, date: new Date().toISOString() }, ...comments]);
    };

    const removeComment = (commentId: number) => {
        setComments(comments.filter(c => c.id !== commentId));
    };

    const editComment = (commentId: number, text: string) => {
        setComments(comments.map(c => c.id === commentId ? { ...c, text } : c));
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
        editComment
    };
}
