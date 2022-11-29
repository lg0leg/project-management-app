import React, { ComponentProps, forwardRef } from 'react';
import { FieldError } from './Form';

interface InputProps extends ComponentProps<'input'> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = 'text', ...props },
  ref
) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-900">{label}</label>
      <input
        type={type}
        ref={ref}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        {...props}
      />
      <FieldError name={props.name} />
    </div>
  );
});

export default Input;
