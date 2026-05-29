import type { SelectHTMLAttributes } from 'react'

// Define the shape of each option in the dropdown
export interface SelectOption {
    value: string;
    label: string;
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: SelectOption[];
}

export function SelectInput({ label, id, options, ...rest }: SelectInputProps) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
                {label}
            </label>
            <select
                id={id}
                className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...rest}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
