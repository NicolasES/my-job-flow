import { useState } from 'react';
import { TextInput } from '../form/TextInput';
import type { ContactItem } from '../form/DynamicContactList';

interface JobContactsCardProps {
    contacts: ContactItem[];
    onAddContact: (contact: Omit<ContactItem, 'id'>) => Promise<void>;
    onUpdateContact: (id: number, contact: Omit<ContactItem, 'id'>) => Promise<void>;
    onDeleteContact: (id: number) => Promise<void>;
}

export function JobContactsCard({ contacts, onAddContact, onUpdateContact, onDeleteContact }: JobContactsCardProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [newContact, setNewContact] = useState({ name: '', role: '', linkedin: '', phone: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [editingContactId, setEditingContactId] = useState<number | null>(null);
    const [editContact, setEditContact] = useState({ name: '', role: '', linkedin: '', phone: '' });

    const handleAdd = async () => {
        if (!newContact.name.trim()) return;
        setIsSubmitting(true);
        await onAddContact(newContact);
        setIsSubmitting(false);
        setNewContact({ name: '', role: '', linkedin: '', phone: '' });
        setIsAdding(false);
    };

    const handleStartEdit = (contact: ContactItem) => {
        setEditingContactId(contact.id);
        setEditContact({
            name: contact.name,
            role: contact.role,
            linkedin: contact.linkedin || '',
            phone: contact.phone || ''
        });
        setIsAdding(false);
    };

    const handleSaveEdit = async () => {
        if (!editingContactId || !editContact.name.trim()) return;
        setIsSubmitting(true);
        await onUpdateContact(editingContactId, editContact);
        setIsSubmitting(false);
        setEditingContactId(null);
    };

    const handleRemove = async (id: number) => {
        if(confirm('Deseja excluir este contato?')) {
            await onDeleteContact(id);
        }
    };

    return (
        <section className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-white">Contatos</h2>
                <button type="button" onClick={() => { setIsAdding(!isAdding); setEditingContactId(null); }} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    {isAdding ? "Cancelar" : "+ Adicionar"}
                </button>
            </div>

            {isAdding && (
                <div className="bg-slate-900 border border-slate-600 p-3 rounded-md mb-4 flex flex-col gap-2">
                    <TextInput id="c-name" label="Nome" placeholder="Nome" value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} />
                    <TextInput id="c-role" label="Cargo" placeholder="Ex: Tech Recruiter" value={newContact.role} onChange={e => setNewContact({ ...newContact, role: e.target.value })} />
                    <TextInput id="c-linkedin" label="LinkedIn" placeholder="URL (opcional)" value={newContact.linkedin} onChange={e => setNewContact({...newContact, linkedin: e.target.value})} />
                    <TextInput id="c-phone" label="Telefone" placeholder="Número (opcional)" value={newContact.phone} onChange={e => setNewContact({...newContact, phone: e.target.value})} />
                    <button type="button" onClick={handleAdd} disabled={isSubmitting} className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 self-end disabled:opacity-50">
                        {isSubmitting ? 'Salvando...' : 'Salvar Contato'}
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-3">
                {contacts.map(contact => (
                    <div key={contact.id} className="bg-slate-900 border border-slate-600 p-3 rounded-md flex flex-col gap-1 relative group">
                        {editingContactId === contact.id ? (
                            <div className="flex flex-col gap-2 w-full">
                                <TextInput id={`ce-name-${contact.id}`} label="Nome" placeholder="Nome" value={editContact.name} onChange={e => setEditContact({ ...editContact, name: e.target.value })} />
                                <TextInput id={`ce-role-${contact.id}`} label="Cargo" placeholder="Ex: Tech Recruiter" value={editContact.role} onChange={e => setEditContact({ ...editContact, role: e.target.value })} />
                                <TextInput id={`ce-linkedin-${contact.id}`} label="LinkedIn" placeholder="URL (opcional)" value={editContact.linkedin} onChange={e => setEditContact({...editContact, linkedin: e.target.value})} />
                                <TextInput id={`ce-phone-${contact.id}`} label="Telefone" placeholder="Número (opcional)" value={editContact.phone} onChange={e => setEditContact({...editContact, phone: e.target.value})} />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button type="button" onClick={() => setEditingContactId(null)} className="text-slate-400 hover:text-white text-sm">Cancelar</button>
                                    <button type="button" onClick={handleSaveEdit} disabled={isSubmitting} className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50">
                                        {isSubmitting ? 'Salvando...' : 'Salvar'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button type="button" onClick={() => handleStartEdit(contact)} className="text-slate-500 hover:text-blue-400 text-xs">Editar</button>
                                    <button type="button" onClick={() => handleRemove(contact.id)} className="text-slate-500 hover:text-red-400 font-bold">&times;</button>
                                </div>
                                <span className="text-sm font-medium text-white">{contact.name}</span>
                                <span className="text-xs text-slate-400">{contact.role}</span>
                                <div className="flex gap-2 mt-2">
                                    {contact.linkedin && <a href={contact.linkedin.startsWith('http') ? contact.linkedin : `https://${contact.linkedin}`} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">LinkedIn</a>}
                                    {contact.linkedin && contact.phone && <span className="text-slate-600">|</span>}
                                    {contact.phone && <span className="text-xs text-slate-400">{contact.phone}</span>}
                                </div>
                            </>
                        )}
                    </div>
                ))}
                {contacts.length === 0 && <p className="text-sm text-slate-500">Nenhum contato.</p>}
            </div>
        </section>
    );
}
