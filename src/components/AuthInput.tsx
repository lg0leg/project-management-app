import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import type { IAuthRequest } from 'model/typescript';

interface IProps {
  type: string;
  title: string;
  placeholder: string;
  label: Path<IAuthRequest>;
  register: UseFormRegister<IAuthRequest>;
  minLength: number;
  maxLength: number;
}
export default function AuthInput({
  type,
  placeholder,
  title,
  register,
  label,
  minLength,
  maxLength,
}: IProps) {
  return (
    <div>
      <label className="mt-2 block text-sm font-medium text-gray-900">{title}</label>
      <input
        type={type}
        className="block w-full rounded-lg border-2 border-gray-400 p-2 text-black hover:border-gray-600 focus:outline-blue-900"
        placeholder={placeholder}
        {...register(label, { minLength, maxLength })}
        required
      />
    </div>
  );
}
