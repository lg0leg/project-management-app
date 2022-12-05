import { LangKey } from 'constants/lang';
import { ValidateKey } from 'constants/authValidation';
import { ValidationValueMessage } from 'react-hook-form';
import type { ValueOf } from 'models/typescript';

export const getErrorMessage = (
  errorKey: string | undefined,
  lang: ValueOf<LangKey>,
  length?: number
) => {
  switch (errorKey) {
    case ValidateKey.NAME:
      return lang === LangKey.EN
        ? `Must be only latin letters`
        : `Должны быть только латинские буквы`;

    case ValidateKey.PASSWORD:
      return lang === LangKey.EN
        ? `Must be at least one number or one latin letter`
        : `Должна быть хотя бы одна цифра или одна латинская буква`;

    case ValidateKey.MIN_LENGTH:
      return lang === LangKey.EN ? `Minimum ${length} characters` : `Минимум ${length} символа`;

    case ValidateKey.MAX_LENGTH:
      return lang === LangKey.EN ? `Maximum ${length} characters` : `Максимум ${length} символа`;

    case ValidateKey.REPEAT_PASS:
      return lang === LangKey.EN ? `Password does not match` : `Пароль не совпадает`;
    default:
      return '';
  }
};

export const getValidateMinLength = (value: number) => {
  return {
    value,
    message: ValidateKey.MIN_LENGTH,
  } as ValidationValueMessage<number>;
};

export const getValidateMaxLength = (value: number) => {
  return {
    value,
    message: ValidateKey.MAX_LENGTH,
  } as ValidationValueMessage<number>;
};

export const getValidateName = () => {
  return {
    value: new RegExp('^([a-z]+)$', 'gi'),
    message: ValidateKey.NAME,
  } as ValidationValueMessage<RegExp>;
};

export const getValidatePassword = () => {
  return {
    value: new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])', 'g'),
    message: ValidateKey.PASSWORD,
  } as ValidationValueMessage<RegExp>;
};
