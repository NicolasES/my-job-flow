import { useState } from "react";
import { TextAreaInput } from "../form/TextAreaInput";

interface CommentItem {
    id: number;
    text: string;
    date: string;
}

interface JobCommentsCardProps {
    comments: CommentItem[];
    onAddComment: (text: string) => void;
    onRemoveComment: (id: number) => void;
    onEditComment: (id: number, text: string) => void;
}

export function JobCommentsCard({ comments, onAddComment, onRemoveComment, onEditComment }: JobCommentsCardProps) {
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editingCommentText, setEditingCommentText] = useState("");

    const handleAdd = () => {
        if (!newComment.trim()) return;
        onAddComment(newComment);
        setNewComment("");
    };

    const handleSaveEdit = () => {
        if (editingCommentId !== null) {
            onEditComment(editingCommentId, editingCommentText);
            setEditingCommentId(null);
        }
    };

    return (
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
                    onClick={handleAdd}
                    className="self-end px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm transition-colors"
                >
                    Adicionar Nota
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {comments.map(comment => (
                    <div key={comment.id} className="bg-slate-900 border border-slate-600 p-4 rounded-md relative group">
                        <div className="absolute top-2 right-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => { setEditingCommentId(comment.id); setEditingCommentText(comment.text); }}
                                className="text-slate-400 hover:text-blue-400 text-xs font-medium"
                                title="Editar comentário"
                            >Editar</button>
                            <button
                                onClick={() => onRemoveComment(comment.id)}
                                className="text-slate-400 hover:text-red-400 font-bold"
                                title="Excluir comentário"
                            >&times;</button>
                        </div>

                        {editingCommentId === comment.id ? (
                            <div className="flex flex-col gap-2 mt-2">
                                <TextAreaInput
                                    id={`edit-${comment.id}`}
                                    label=""
                                    rows={2}
                                    value={editingCommentText}
                                    onChange={(e) => setEditingCommentText(e.target.value)}
                                />
                                <div className="flex gap-2 self-end">
                                    <button onClick={() => setEditingCommentId(null)} className="px-3 py-1 text-sm text-slate-400 hover:text-white">Cancelar</button>
                                    <button onClick={handleSaveEdit} className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Salvar</button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-200 mb-2 pr-12 leading-relaxed whitespace-pre-wrap">
                                {comment.text}
                            </p>
                        )}
                        <span className="text-xs text-slate-500">{new Date(comment.date).toLocaleString('pt-BR')}</span>
                    </div>
                ))}
                {comments.length === 0 && <p className="text-sm text-slate-500">Nenhum comentário ainda.</p>}
            </div>
        </section>
    );
}
