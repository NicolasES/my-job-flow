import { useState } from 'react';
import { TextInput } from './TextInput';

export interface ContactItem {
    id: number;
    name: string;
    role: string;
    linkedin?: string;
    phone?: string;
}

interface DynamicContactListProps {
    contacts: ContactItem[];
    onChange: (contacts: ContactItem[]) => void;
    readOnly?: boolean;
}

export function DynamicContactList({ contacts, onChange, readOnly = false }: DynamicContactListProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', role: '', linkedin: '', phone: '' });

    const handleAdd = () => {
        if (!newContact.name.trim()) return;
        onChange([...contacts, { id: Date.now(), ...newContact }]);
        setNewContact({ name: '', role: '', linkedin: '', phone: '' });
        setIsAdding(false);
    };

    const handleRemove = (id: number) => {
        onChange(contacts.filter(c => c.id !== id));
    };

    return (
        <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-white">Contatos</h2>
                {!readOnly && (
                    <button type="button" onClick={() => setIsAdding(!isAdding)} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        {isAdding ? "Cancelar" : "+ Adicionar"}
                    </button>
                )}
            </div>

            {isAdding && !readOnly && (
                <div className="bg-slate-900 border border-slate-600 p-3 rounded-md mb-4 flex flex-col gap-2">
                    <TextInput id="c-name" label="Nome" placeholder="Nome" value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} />
                    <TextInput id="c-role" label="Cargo" placeholder="Ex: Tech Recruiter" value={newContact.role} onChange={e => setNewContact({ ...newContact, role: e.target.value })} />
                    <TextInput id="c-linkedin" label="LinkedIn" placeholder="URL (opcional)" value={newContact.linkedin} onChange={e => setNewContact({...newContact, linkedin: e.target.value})} />
                    <TextInput id="c-phone" label="Telefone" placeholder="Número (opcional)" value={newContact.phone} onChange={e => setNewContact({...newContact, phone: e.target.value})} />
                    <button type="button" onClick={handleAdd} className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 self-end">Salvar Contato</button>
                </div>
            )}

            <div className="flex flex-col gap-3">
                {contacts.map(contact => (
                    <div key={contact.id} className="bg-slate-900 border border-slate-600 p-3 rounded-md flex flex-col gap-1 relative group">
                        {!readOnly && (
                            <button type="button" onClick={() => handleRemove(contact.id)} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                        )}
                        <span className="text-sm font-medium text-white">{contact.name}</span>
                        <span className="text-xs text-slate-400">{contact.role}</span>
                        <div className="flex gap-2 mt-2">
                            {contact.linkedin && <a href={`https://${contact.linkedin.replace('https://', '')}`} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">LinkedIn</a>}
                            {contact.linkedin && contact.phone && <span className="text-slate-600">|</span>}
                            {contact.phone && <a href="#" className="text-xs text-blue-400 hover:underline">{contact.phone}</a>}
                        </div>
                    </div>
                ))}
                {contacts.length === 0 && <p className="text-sm text-slate-500">Nenhum contato.</p>}
            </div>
        </section>
    );
}
