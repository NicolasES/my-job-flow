import { useState } from 'react';
import { TextInput } from './TextInput';

export interface LinkItem {
    id: number;
    title: string;
    url: string;
}

interface DynamicLinkListProps {
    links: LinkItem[];
    onChange: (links: LinkItem[]) => void;
    readOnly?: boolean;
}

export function DynamicLinkList({ links, onChange, readOnly = false }: DynamicLinkListProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [newLink, setNewLink] = useState({ title: '', url: '' });

    const handleAdd = () => {
        if (!newLink.title.trim() || !newLink.url.trim()) return;
        onChange([...links, { id: Date.now(), ...newLink }]);
        setNewLink({ title: '', url: '' });
        setIsAdding(false);
    };

    const handleRemove = (id: number) => {
        onChange(links.filter(l => l.id !== id));
    };

    return (
        <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-white">Links Úteis</h2>
                {!readOnly && (
                    <button type="button" onClick={() => setIsAdding(!isAdding)} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        {isAdding ? "Cancelar" : "+ Adicionar"}
                    </button>
                )}
            </div>

            {isAdding && !readOnly && (
                <div className="bg-slate-900 border border-slate-600 p-3 rounded-md mb-4 flex flex-col gap-2">
                    <TextInput id="l-title" label="Título" placeholder="Ex: Desafio Técnico" value={newLink.title} onChange={e => setNewLink({ ...newLink, title: e.target.value })} />
                    <TextInput id="l-url" label="URL" placeholder="https://..." value={newLink.url} onChange={e => setNewLink({ ...newLink, url: e.target.value })} />
                    <button type="button" onClick={handleAdd} className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 self-end">Salvar Link</button>
                </div>
            )}

            <div className="flex flex-col gap-3">
                {links.map(link => (
                    <div key={link.id} className="bg-slate-900 border border-slate-600 p-3 rounded-md flex justify-between items-center group relative">
                        <div className="flex flex-col max-w-[80%]">
                            <span className="text-sm font-medium text-white truncate">{link.title}</span>
                            <span className="text-xs text-slate-400 truncate">{link.url}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <a href={`https://${link.url.replace('https://', '')}`} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-400" title="Abrir link">↗</a>
                            {!readOnly && (
                                <button type="button" onClick={() => handleRemove(link.id)} className="text-slate-500 hover:text-red-400 leading-none" title="Excluir">&times;</button>
                            )}
                        </div>
                    </div>
                ))}
                {links.length === 0 && <p className="text-sm text-slate-500">Nenhum link.</p>}
            </div>
        </section>
    );
}
