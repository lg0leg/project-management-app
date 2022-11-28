import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IAuthRequest, IRegisterRequest } from 'models/typescript';
import AuthInput from 'components/AuthInput';
import AuthSubmit from 'components/AuthSubmit';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { fetchRegister } from 'app/actionCreators/authActionCreators';
import { LangKey } from 'constants/lang';
import SpinnerWithOverlay from 'components/spinners/SpinnerWithOverlay';
import {
  getValidateMaxLength,
  getValidateMinLength,
  getValidatePassword,
  getValidateName,
} from 'utils/getAuthValidation';
import { InputLength, ValidateKey } from 'constants/authValidation';

export const SignUp: FC = () => {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { httpCode, isError, isLoading } = useAppSelector((state) => state.authReducer);
  const { lang } = useAppSelector((state) => state.langReducer);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAuthRequest>();
  const onSubmit: SubmitHandler<IAuthRequest> = (res) => {
    const { name, login, password } = res as IRegisterRequest;
    const data = { name, login, password };
    dispatch(fetchRegister({ data, navigate }));
  };

  let errorText = '';
  if (httpCode === 409) {
    errorText = lang === LangKey.EN ? 'This login already exists' : 'Такой логин уже существует';
  }

  return (
    <div className="min-h-[100%] bg-gray-300">
      <SpinnerWithOverlay isLoading={isLoading} />
      <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center  bg-registration bg-contain bg-no-repeat">
        <form
          className="rounded-xl border-2 border-gray-400 bg-gray-50/90 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isError && (
            <div className="underline-offset-3 w-full text-center text-base font-medium text-red-500 underline underline-offset-2">
              {errorText}
            </div>
          )}

          <AuthInput
            label="name"
            title={lang === LangKey.EN ? 'Your name:' : 'Ваш имя:'}
            placeholder={lang === LangKey.EN ? 'Name' : 'Имя'}
            register={register}
            type="text"
            minLength={getValidateMinLength(InputLength.NAME_MIN)}
            maxLength={getValidateMaxLength(InputLength.NAME_MAX)}
            pattern={getValidateName()}
            errors={errors}
            required
          />
          <AuthInput
            label="login"
            title={lang === LangKey.EN ? 'Your login:' : 'Ваш логин:'}
            placeholder={lang === LangKey.EN ? 'Login' : 'Логин'}
            register={register}
            type="text"
            minLength={getValidateMinLength(InputLength.LOGIN_MIN)}
            maxLength={getValidateMaxLength(InputLength.LOGIN_MAX)}
            errors={errors}
            required
          />
          <AuthInput
            label="password"
            title={lang === LangKey.EN ? 'Your password:' : 'Ваш пароль:'}
            placeholder={lang === LangKey.EN ? 'Password' : 'Пароль'}
            register={register}
            type="password"
            minLength={getValidateMinLength(InputLength.PASS_MIN)}
            maxLength={getValidateMaxLength(InputLength.PASS_MAX)}
            pattern={getValidatePassword()}
            errors={errors}
            required
          />
          <AuthInput
            label="passwordRepeat"
            title={lang === LangKey.EN ? 'Repeat password' : 'Повторите пароль'}
            placeholder={lang === LangKey.EN ? 'Repeat password' : 'Повторите пароль'}
            register={register}
            type="password"
            minLength={getValidateMinLength(InputLength.PASS_MIN)}
            maxLength={getValidateMaxLength(InputLength.PASS_MAX)}
            errors={errors}
            validate={{
              matchPassword: (value) => watch('password') === value || ValidateKey.REPEAT_PASS,
            }}
          />
          <AuthSubmit text={lang === LangKey.EN ? 'Sign up' : 'Зарегистрироваться'} />
        </form>
      </div>
      <i>
        <a
          className="ml-1 text-blue-900 hover:underline"
          href="https://www.freepik.com/"
          target="blank"
          rel="noreferrer noopener"
        >
          Designed by slidesgo / Freepik
        </a>
      </i>
    </div>
  );
};

export default SignUp;
