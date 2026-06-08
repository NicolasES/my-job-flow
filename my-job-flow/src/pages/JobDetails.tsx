import { useState } from "react";
import { TextAreaInput } from "../components/form/TextAreaInput";
import { DynamicContactList } from "../components/form/DynamicContactList";
import type { ContactItem } from "../components/form/DynamicContactList";
import { DynamicLinkList } from "../components/form/DynamicLinkList";
import type { LinkItem } from "../components/form/DynamicLinkList";

export default function JobDetails() {
    // Mock Data
    const job = {
        title: "React Developer",
        company: "Globant",
        workModel: "Híbrido",
        salary: "15.000",
        appliedAt: "2023-10-15",
        status: "Entrevista Inicial",
        description: "Vaga para atuar no squad de pagamentos.\nRequisitos:\n- 4+ anos com React\n- Conhecimento em TypeScript e testes automatizados (Jest)\n- Boa comunicação e perfil analítico."
    };

    // Mock
    const [comments, setComments] = useState([
        { id: 1, text: "Fiz a entrevista inicial com o RH. Foi bem tranquilo, perguntaram sobre minha experiência com React.", date: "16 Out 2023, 14:30" },
        { id: 2, text: "Enviei o meu currículo pelo site da Gupy.", date: "15 Out 2023, 10:00" }
    ]);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editingCommentText, setEditingCommentText] = useState("");

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        setComments([{ id: Date.now(), text: newComment, date: "Agora mesmo" }, ...comments]);
        setNewComment("");
    };

    const handleRemoveComment = (id: number) => {
        setComments(comments.filter(c => c.id !== id));
    };

    const handleSaveEditComment = () => {
        setComments(comments.map(c => c.id === editingCommentId ? { ...c, text: editingCommentText } : c));
        setEditingCommentId(null);
    };

    const [contacts, setContacts] = useState<ContactItem[]>([
        { id: 1, name: "Ana Souza", role: "Tech Recruiter", linkedin: "linkedin.com/in/ana", phone: "11999999999" }
    ]);

    const [links, setLinks] = useState<LinkItem[]>([
        { id: 1, title: "Desafio Técnico", url: "github.com/empresa/desafio-front" }
    ]);

    return (
        <div className="flex flex-col h-full p-8 overflow-y-auto custom-scrollbar">

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-semibold text-white">{job.title}</h1>
                    <p className="text-slate-400 mt-1">{job.company} • {job.workModel}</p>
                </div>
                <div className="bg-blue-600/20 text-blue-400 border border-blue-600/50 px-4 py-1.5 rounded-full text-sm font-medium">
                    {job.status}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl">

                <div className="lg:col-span-2 flex flex-col gap-6">
                    <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-lg font-medium text-white mb-4">Descrição da Vaga</h2>
                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                            {job.description}
                        </p>
                    </section>

                    <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-lg font-medium text-white mb-4">Comentários</h2>

                        <div className="mb-6 flex flex-col gap-2">
                            <TextAreaInput
                                id="newComment"
                                label=""
                                rows={3}
                                placeholder="Adicione uma atualização ou anotação (ex: Fiz o teste técnico hoje...)"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button
                                onClick={handleAddComment}
                                className="self-end px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm transition-colors"
                            >
                                Adicionar Nota
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {comments.map(comment => (
                                <div key={comment.id} className="bg-slate-900 border border-slate-600 p-4 rounded-md relative group">
                                    <button
                                        onClick={() => handleRemoveComment(comment.id)}
                                        className="absolute top-2 right-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Excluir"
                                    >&times;</button>

                                    {editingCommentId === comment.id ? (
                                        <div className="flex flex-col gap-2">
                                            <TextAreaInput
                                                id={`edit-${comment.id}`}
                                                label=""
                                                rows={2}
                                                value={editingCommentText}
                                                onChange={(e) => setEditingCommentText(e.target.value)}
                                            />
                                            <div className="flex gap-2 self-end">
                                                <button onClick={() => setEditingCommentId(null)} className="px-3 py-1 text-sm text-slate-400 hover:text-white">Cancelar</button>
                                                <button onClick={handleSaveEditComment} className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p
                                            className="text-sm text-slate-200 mb-2 pr-4 cursor-pointer hover:text-blue-300"
                                            onClick={() => { setEditingCommentId(comment.id); setEditingCommentText(comment.text); }}
                                            title="Clique para editar"
                                        >
                                            {comment.text}
                                        </p>
                                    )}
                                    <span className="text-xs text-slate-500">{comment.date}</span>
                                </div>
                            ))}
                            {comments.length === 0 && <p className="text-sm text-slate-500">Nenhum comentário ainda.</p>}
                        </div>
                    </section>
                </div>

                <div className="flex flex-col gap-6">
                    <DynamicContactList contacts={contacts} onChange={setContacts} />
                    <DynamicLinkList links={links} onChange={setLinks} />

                </div>
            </div>
        </div>
    )
}
