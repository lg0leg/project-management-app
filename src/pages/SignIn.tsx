import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IAuthRequest } from 'models/typescript';
import AuthInput from 'components/AuthInput';
import AuthSubmit from 'components/AuthSubmit';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { fetchLogin } from 'app/actionCreators/authActionCreators';
import { LangKey } from 'constants/lang';
import { RoutesPath } from 'constants/routes';
import SpinnerWithOverlay from 'components/spinners/SpinnerWithOverlay';
import {
  getValidateMaxLength,
  getValidateMinLength,
  getValidatePassword,
} from 'utils/getAuthValidation';
import { InputLength } from 'constants/authValidation';
export const SignIn: FC = () => {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { httpCode, isError, isLoading } = useAppSelector((state) => state.authReducer);
  const { lang } = useAppSelector((state) => state.langReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthRequest>();
  const onSubmit: SubmitHandler<IAuthRequest> = (data) => {
    const { login, password } = data;
    dispatch(fetchLogin({ login, password, navigate }));
  };

  let errorText = '';
  if (httpCode === 401) {
    errorText = lang === LangKey.EN ? 'Wrong login/password' : 'Неправильный пароль/логин';
  }
  return (
    <div className="min-h-[100%] bg-gray-300">
      <SpinnerWithOverlay isLoading={isLoading} />
      <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center  bg-login bg-contain bg-no-repeat">
        <form
          className="rounded-xl border-2 border-gray-400 bg-gray-50/90 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            {isError && (
              <div className="underline-offset-3 w-full text-center text-base font-medium text-red-500 underline underline-offset-2">
                {errorText}
              </div>
            )}
          </div>
          <AuthInput
            label="login"
            title={lang === LangKey.EN ? 'Your login:' : 'Ваш логин:'}
            placeholder={lang === LangKey.EN ? 'login' : 'логин'}
            register={register}
            type="text"
            minLength={getValidateMinLength(InputLength.LOGIN_MIN)}
            maxLength={getValidateMaxLength(InputLength.LOGIN_MAX)}
            errors={errors}
            required
          />
          <AuthInput
            label="password"
            title={lang === LangKey.EN ? 'Password:' : 'Пароль:'}
            placeholder={lang === LangKey.EN ? 'password' : 'пароль'}
            register={register}
            type="password"
            minLength={getValidateMinLength(InputLength.PASS_MIN)}
            maxLength={getValidateMaxLength(InputLength.PASS_MAX)}
            pattern={getValidatePassword()}
            errors={errors}
            required
          />
          <AuthSubmit text={lang === LangKey.EN ? 'Sign in' : 'Войти'} />
          <p className="pt-3 text-sm font-light text-gray-600">
            {lang === LangKey.EN ? 'Don’t have an account yet?' : 'Нет аккаунта?'}
            <Link
              to={RoutesPath.SIGN_UP}
              className="pl-2 font-bold text-gray-600 hover:text-blue-600"
            >
              {lang === LangKey.EN ? 'Sign up' : 'Зарегистрироваться'}
            </Link>
          </p>
        </form>
      </div>
      <i>
        <a
          className="ml-1 text-blue-900 hover:underline"
          href="https://www.freepik.com/"
          target="blank"
          rel="noreferrer noopener"
        >
          Designed by vectorjuice / Freepik
        </a>
      </i>
    </div>
  );
};

export default SignIn;
