import type { TextareaHTMLAttributes } from 'react'

interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export function TextAreaInput({ label, id, ...rest }: TextAreaInputProps) {
    return (

        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
                {label}
            </label>
            <textarea
                id={id}
                className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...rest}
            />
        </div>
    )
}
