import React from 'react';
import {
  Path,
  UseFormRegister,
  Validate,
  ValidationRule,
  ValidationValueMessage,
} from 'react-hook-form';
import type { IAuthRequest } from 'models/typescript';
import type { FieldErrorsImpl } from 'react-hook-form';
import { useAppSelector } from 'app/hooks';
import { getErrorMessage } from 'utils/getAuthValidation';

interface IProps {
  type: string;
  title: string;
  placeholder: string;
  label: Path<IAuthRequest>;
  register: UseFormRegister<IAuthRequest>;
  minLength: ValidationValueMessage<number>;
  maxLength: ValidationValueMessage<number>;
  required?: boolean;
  pattern?: ValidationRule<RegExp>;
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
  pattern,
}: IProps) {
  const { lang } = useAppSelector((state) => state.langReducer);
  const borderColor = errors[label]
    ? 'border-red-500 focus:outline-red-500'
    : 'border-gray-400 focus:outline-blue-1000';
  let errorText = '';

  switch (errors[label]?.type) {
    case 'minLength':
      errorText = getErrorMessage(errors[label]?.message, lang, minLength.value);
      break;
    case 'maxLength':
      errorText = getErrorMessage(errors[label]?.message, lang, maxLength.value);
      break;
    default:
      errorText = getErrorMessage(errors[label]?.message, lang);
      break;
  }

  return (
    <div>
      <label className="mt-2 block text-sm font-medium text-gray-900">{title}</label>
      <input
        type={type}
        className={`${borderColor}  block w-full rounded-lg  border-2 p-2 text-black hover:border-gray-600`}
        placeholder={placeholder}
        {...register(label, {
          minLength,
          maxLength,
          required,
          pattern,
          validate,
        })}
      />
      {errors[label] && (
        <p className="max-w-[250px] text-center text-sm font-medium text-red-500">{errorText}</p>
      )}
    </div>
  );
}
