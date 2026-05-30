import type { InputHTMLAttributes } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function TextInput({ label, id, ...rest }: TextInputProps) {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...rest}
            />
        </div>
    )
}
