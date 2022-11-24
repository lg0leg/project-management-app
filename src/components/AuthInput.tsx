import React from 'react';
import { Path, UseFormRegister, Validate } from 'react-hook-form';
import type { IAuthRequest } from 'models/typescript';
import type { FieldErrorsImpl } from 'react-hook-form';
interface IProps {
  type: string;
  title: string;
  placeholder: string;
  label: Path<IAuthRequest>;
  register: UseFormRegister<IAuthRequest>;
  minLength: number;
  maxLength: number;
  required?: boolean;
  validate?:
    | Validate<string | undefined>
    | Record<string, Validate<string | undefined>>
    | undefined;
  errors: Partial<
    FieldErrorsImpl<{
      name: string;
      login: string;
      password: string;
      passwordRepeat: string;
    }>
  >;
}

export default function AuthInput({
  type,
  placeholder,
  title,
  register,
  label,
  minLength,
  maxLength,
  errors,
  required,
  validate,
}: IProps) {
  const borderColor = errors[label]
    ? 'border-red-500 focus:outline-red-500'
    : 'border-gray-400 focus:outline-blue-1000';

  const errorText = `Please enter from ${minLength} to ${maxLength} chapters`;

  return (
    <div>
      <label className="mt-2 block text-sm font-medium text-gray-900">{title}</label>
      <input
        type={type}
        className={`${borderColor}  block w-full rounded-lg  border-2 p-2 text-black hover:border-gray-600`}
        placeholder={placeholder}
        {...register(label, { minLength, maxLength, required, validate })}
      />
      {errors[label] && (
        <p className="text-center text-sm font-medium text-red-500">{errors[label]?.message}</p>
      )}
    </div>
  );
}
