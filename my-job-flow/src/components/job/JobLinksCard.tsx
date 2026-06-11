import { useState } from 'react';
import { TextInput } from '../form/TextInput';
import type { LinkItem } from '../form/DynamicLinkList';

interface JobLinksCardProps {
    links: LinkItem[];
    onAddLink: (link: Omit<LinkItem, 'id'>) => Promise<void>;
    onUpdateLink: (id: number, link: Omit<LinkItem, 'id'>) => Promise<void>;
    onDeleteLink: (id: number) => Promise<void>;
}

export function JobLinksCard({ links, onAddLink, onUpdateLink, onDeleteLink }: JobLinksCardProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [newLink, setNewLink] = useState({ title: '', url: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [editingLinkId, setEditingLinkId] = useState<number | null>(null);
    const [editLink, setEditLink] = useState({ title: '', url: '' });

    const handleAdd = async () => {
        if (!newLink.title.trim() || !newLink.url.trim()) return;
        setIsSubmitting(true);
        await onAddLink(newLink);
        setIsSubmitting(false);
        setNewLink({ title: '', url: '' });
        setIsAdding(false);
    };

    const handleStartEdit = (link: LinkItem) => {
        setEditingLinkId(link.id);
        setEditLink({
            title: link.title,
            url: link.url
        });
        setIsAdding(false);
    };

    const handleSaveEdit = async () => {
        if (!editingLinkId || !editLink.title.trim() || !editLink.url.trim()) return;
        setIsSubmitting(true);
        await onUpdateLink(editingLinkId, editLink);
        setIsSubmitting(false);
        setEditingLinkId(null);
    };

    const handleRemove = async (id: number) => {
        if(confirm('Deseja excluir este link?')) {
            await onDeleteLink(id);
        }
    };

    return (
        <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-white">Links Úteis</h2>
                <button type="button" onClick={() => { setIsAdding(!isAdding); setEditingLinkId(null); }} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    {isAdding ? "Cancelar" : "+ Adicionar"}
                </button>
            </div>

            {isAdding && (
                <div className="bg-slate-900 border border-slate-600 p-3 rounded-md mb-4 flex flex-col gap-2">
                    <TextInput id="l-title" label="Título" placeholder="Ex: Desafio Técnico" value={newLink.title} onChange={e => setNewLink({ ...newLink, title: e.target.value })} />
                    <TextInput id="l-url" label="URL" placeholder="https://..." value={newLink.url} onChange={e => setNewLink({ ...newLink, url: e.target.value })} />
                    <button type="button" onClick={handleAdd} disabled={isSubmitting} className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 self-end disabled:opacity-50">
                        {isSubmitting ? 'Salvando...' : 'Salvar Link'}
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-3">
                {links.map(link => (
                    <div key={link.id} className="bg-slate-900 border border-slate-600 p-3 rounded-md flex flex-col gap-2 group relative">
                        {editingLinkId === link.id ? (
                            <div className="flex flex-col gap-2 w-full">
                                <TextInput id={`le-title-${link.id}`} label="Título" placeholder="Ex: Desafio Técnico" value={editLink.title} onChange={e => setEditLink({ ...editLink, title: e.target.value })} />
                                <TextInput id={`le-url-${link.id}`} label="URL" placeholder="https://..." value={editLink.url} onChange={e => setEditLink({ ...editLink, url: e.target.value })} />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button type="button" onClick={() => setEditingLinkId(null)} className="text-slate-400 hover:text-white text-sm">Cancelar</button>
                                    <button type="button" onClick={handleSaveEdit} disabled={isSubmitting} className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50">
                                        {isSubmitting ? 'Salvando...' : 'Salvar'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-col max-w-[70%]">
                                    <span className="text-sm font-medium text-white truncate">{link.title}</span>
                                    <a href={link.url.startsWith('http') ? link.url : `https://${link.url}`} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline truncate">{link.url}</a>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <button type="button" onClick={() => handleStartEdit(link)} className="text-slate-500 hover:text-blue-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Editar</button>
                                    <button type="button" onClick={() => handleRemove(link.id)} className="text-slate-500 hover:text-red-400 leading-none opacity-0 group-hover:opacity-100 transition-opacity" title="Excluir">&times;</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {links.length === 0 && <p className="text-sm text-slate-500">Nenhum link.</p>}
            </div>
        </section>
    );
}
