import React, { useState } from 'react';
import {
  Path,
  UseFormRegister,
  Validate,
  ValidationRule,
  ValidationValueMessage,
} from 'react-hook-form';
import type { IProfileConfirm } from 'models/typescript';
import type { FieldErrorsImpl } from 'react-hook-form';
import { useAppSelector } from 'app/hooks';
import { getErrorMessage } from 'utils/getAuthValidation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface IProps {
  type: string;
  title: string;
  placeholder: string;
  label: Path<IProfileConfirm>;
  register: UseFormRegister<IProfileConfirm>;
  minLength: ValidationValueMessage<number>;
  maxLength: ValidationValueMessage<number>;
  required?: boolean;
  pattern?: ValidationRule<RegExp>;
  defaultValue?: string;
  validate?:
    | Validate<string | undefined>
    | Record<string, Validate<string | undefined>>
    | undefined;
  errors: Partial<
    FieldErrorsImpl<{
      oldPassword: string;
    }>
  >;
}

export default function ProfileConfirmInput({
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
  defaultValue,
}: IProps) {
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword((state) => !state);
  };

  return (
    <div className="mb-5">
      <label className="mt-2 mb-5 text-lg font-normal text-gray-500">{title}</label>
      {type === 'text' ? (
        <input
          type={type}
          className={`${borderColor}  block w-full rounded-lg  border-2 p-2 text-black hover:border-gray-600`}
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...register(label, {
            minLength,
            maxLength,
            required,
            pattern,
            validate,
          })}
        />
      ) : (
        <div className="relative ">
          <input
            type={showPassword ? 'text' : type}
            className={`${borderColor}  block w-full rounded-lg  border-2 p-2 pr-[30px] text-black hover:border-gray-600`}
            placeholder={placeholder}
            {...register(label, {
              minLength,
              maxLength,
              required,
              pattern,
              validate,
            })}
          />
          <i
            className="absolute top-4 right-3 cursor-pointer duration-300 hover:scale-125"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </i>
        </div>
      )}

      {errors[label] && (
        <p className="max-w-[250px] text-center text-sm font-medium text-red-500">{errorText}</p>
      )}
    </div>
  );
}
