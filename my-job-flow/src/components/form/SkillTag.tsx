interface SkillTagProps {
    label: string;
    onRemove: () => void; // 1. Adicionamos a tipagem da função
}

// 2. Recebemos o onRemove
export function SkillTag({ label, onRemove }: SkillTagProps) {
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-700 text-slate-200 text-sm rounded-md border border-slate-600">
            {label}
            <button
                type="button"
                onClick={onRemove} // 3. Ligamos o click do botão a essa função
                className="text-slate-400 hover:text-white focus:outline-none leading-none ml-1"
                aria-label="Remove skill"
            >
                &times;
            </button>
        </span>
    )
}
