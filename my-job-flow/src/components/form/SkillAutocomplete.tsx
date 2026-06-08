import { useState, useRef, useEffect } from 'react'
import type { Skill } from '../../services/SkillService'

interface SkillAutocompleteProps {
    availableSkills: Skill[];
    alreadySelected?: Skill[];
    onAddSkill: (skill: Skill) => void;
    onCreateSkill: (name: string) => Promise<Skill>;
}

export function SkillAutocomplete({
    availableSkills,
    alreadySelected = [],
    onAddSkill,
    onCreateSkill
}: SkillAutocompleteProps) {
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredSkills = availableSkills.filter(skill =>
        skill.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !alreadySelected.some(s => s.id === skill.id)
    );

    const exactMatchExists = availableSkills.some(
        skill => skill.name.toLowerCase() === inputValue.trim().toLowerCase()
    );

    const showCreateOption = inputValue.trim().length > 0 && !exactMatchExists;

    const handleSelect = (skill: Skill) => {
        onAddSkill(skill);
        setInputValue("");
        setIsOpen(false);
    };

    const handleCreate = async () => {
        if (!inputValue.trim() || isCreating) return;

        setIsCreating(true);
        try {
            const newSkill = await onCreateSkill(inputValue.trim());
            handleSelect(newSkill);
        } catch (err) {
            console.error("Error creating skill", err);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="relative w-full max-w-sm" ref={wrapperRef}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Digite uma skill"
                disabled={isCreating}
            />

            {isOpen && (inputValue.length > 0 || filteredSkills.length > 0) && (
                <div className="absolute top-full left-0 mt-1 w-full bg-slate-800 border border-slate-700 rounded-md shadow-lg z-10 overflow-hidden max-h-48 overflow-y-auto custom-scrollbar">
                    <ul className="py-1 text-sm text-slate-300">
                        {filteredSkills.map(skill => (
                            <li
                                key={skill.id}
                                onClick={() => handleSelect(skill)}
                                className="px-3 py-2 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors flex items-center justify-between"
                            >
                                {skill.name}
                                <span className="text-xs text-slate-500">Existing</span>
                            </li>
                        ))}

                        {showCreateOption && (
                            <li
                                onClick={handleCreate}
                                className={`px-3 py-2 border-t border-slate-700 transition-colors ${isCreating ? 'text-slate-500 cursor-not-allowed' : 'text-blue-400 hover:bg-slate-700 cursor-pointer'}`}
                            >
                                {isCreating ? 'Creating...' : <>Create <span className="font-semibold text-white">"{inputValue.trim()}"</span> +</>}
                            </li>
                        )}

                    </ul>
                </div>
            )}
        </div>
    )
}
