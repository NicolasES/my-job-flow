import { useState, useRef, useEffect } from 'react'

const MOCK_DB_SKILLS = [
    "React", "Node.js", "TypeScript", "JavaScript",
    "Python", "Docker", "Figma", "Tailwind CSS", "AWS", "SQL"
];

interface SkillAutocompleteProps {
    onAddSkill: (skill: string) => void;
    // Optional: to hide skills we already picked from the dropdown
    alreadySelected?: string[];
}

export function SkillAutocomplete({ onAddSkill, alreadySelected = [] }: SkillAutocompleteProps) {
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

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

    const filteredSkills = MOCK_DB_SKILLS.filter(skill =>
        skill.toLowerCase().includes(inputValue.toLowerCase()) &&
        !alreadySelected.includes(skill)
    );

    const exactMatchExists = MOCK_DB_SKILLS.some(
        skill => skill.toLowerCase() === inputValue.trim().toLowerCase()
    );

    const showCreateOption = inputValue.trim().length > 0 && !exactMatchExists;

    const handleSelect = (skill: string) => {
        onAddSkill(skill);
        setInputValue("");
        setIsOpen(false);
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
            />

            {isOpen && (inputValue.length > 0 || filteredSkills.length > 0) && (
                <div className="absolute top-full left-0 mt-1 w-full bg-slate-800 border border-slate-700 rounded-md shadow-lg z-10 overflow-hidden max-h-48 overflow-y-auto custom-scrollbar">
                    <ul className="py-1 text-sm text-slate-300">
                        {filteredSkills.map(skill => (
                            <li
                                key={skill}
                                onClick={() => handleSelect(skill)}
                                className="px-3 py-2 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors flex items-center justify-between"
                            >
                                {skill}
                                <span className="text-xs text-slate-500">Existing</span>
                            </li>
                        ))}

                        {showCreateOption && (
                            <li
                                onClick={() => handleSelect(inputValue.trim())}
                                className="px-3 py-2 hover:bg-slate-700 cursor-pointer border-t border-slate-700 text-blue-400 transition-colors"
                            >
                                Create <span className="font-semibold text-white">"{inputValue.trim()}"</span> +
                            </li>
                        )}

                    </ul>
                </div>
            )}
        </div>
    )
}
