interface SkillTagProps {
    label: string;
}

export function SkillTag({ label }: SkillTagProps) {
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-700 text-slate-200 text-sm rounded-md border border-slate-600">
            {label}
            <button
                type="button"
                className="text-slate-400 hover:text-white focus:outline-none leading-none ml-1"
                aria-label="Remove skill"
            >
                &times;
            </button>
        </span>
    )
}
