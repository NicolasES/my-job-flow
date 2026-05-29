export interface JobCardProps {
    title: string;
    company: string;
    location: string;
    date: string;
}

export function JobCard({ title, company, location, date }: JobCardProps) {
    return (
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-slate-600 cursor-pointer transition-colors">
            <h3 className="font-semibold text-slate-100">{title}</h3>
            <p className="text-sm text-slate-400 mt-1">@ {company}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                <span>📍 {location}</span>
            </div>
            <div className="mt-3 text-xs text-slate-400">
                {date}
            </div>
        </div>
    )
}
