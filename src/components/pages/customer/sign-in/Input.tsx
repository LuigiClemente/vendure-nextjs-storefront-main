/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ChangeEvent } from 'react'
import { UseFormRegister, FieldError } from 'react-hook-form'

type InputProps = {
  label: string
  name: string
  type?: string
  error?: FieldError | undefined
  required?: boolean
  register: UseFormRegister<any>
  css: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void // Fix: Specify the event type
  part?: string
}

const Input: FC<InputProps> = ({
  label,
  name,
  register,
  type = 'text',
  required = false,
  error,
  css,
  onChange,
  part,
}) => {
  return (
    <div className={`relative mb-6 w-full`}>
      <label className="mb-2 block text-sm font-medium text-txt dark:text-white" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name)}
        id={name}
        name={name}
        type={type}
        autoComplete="email"
        required={required}
        // onChange={(e) => onChange?.(e)} // Use optional chaining to handle undefined onChange
        className={`block  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-100 dark:text-gray-900 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${css}`}
      />
      <div className="min-h-2 mb-5 h-2 text-red-500">{error?.message || ''}</div>
    </div>
  )
}

export default Input
