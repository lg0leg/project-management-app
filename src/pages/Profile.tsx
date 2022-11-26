import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { IAuthRequest } from 'models/typescript';
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

export const Profile: FC = () => {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { httpCode, isError, isLoading } = useAppSelector((state) => state.authReducer);
  const { lang } = useAppSelector((state) => state.langReducer);

  const name = lang === 'en' ? 'Enter new name:' : 'Введите новое имя:';
  const login = lang === 'en' ? 'Enter new login:' : 'Введите новый логин:';
  const pass = lang === 'en' ? 'Enter new password:' : 'Введите новый пароль:';
  const passRepeat = lang === 'en' ? 'Repeat new password:' : 'повторите новый пароль:';
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAuthRequest>();
  const onSubmit: SubmitHandler<IAuthRequest> = (res) => {
    console.log(res);
    // dispatch(fetchRegister({ data, navigate }));
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
            title={name}
            placeholder="New name"
            register={register}
            type="text"
            minLength={getValidateMinLength(InputLength.NAME_MIN)}
            maxLength={getValidateMaxLength(InputLength.NAME_MAX)}
            pattern={getValidateName()}
            errors={errors}
          />
          <AuthInput
            label="login"
            title={login}
            placeholder="New login"
            register={register}
            type="text"
            minLength={getValidateMinLength(InputLength.LOGIN_MIN)}
            maxLength={getValidateMaxLength(InputLength.LOGIN_MAX)}
            errors={errors}
          />
          <AuthInput
            label="password"
            title={pass}
            placeholder="New password"
            register={register}
            type="password"
            minLength={getValidateMinLength(InputLength.PASS_MIN)}
            maxLength={getValidateMaxLength(InputLength.PASS_MAX)}
            pattern={getValidatePassword()}
            errors={errors}
          />
          <AuthInput
            label="passwordRepeat"
            title={passRepeat}
            placeholder="Repeat new password"
            register={register}
            type="password"
            minLength={getValidateMinLength(InputLength.PASS_MIN)}
            maxLength={getValidateMaxLength(InputLength.PASS_MAX)}
            errors={errors}
            validate={{
              matchPassword: (value) => watch('password') === value || ValidateKey.REPEAT_PASS,
            }}
          />
          <AuthSubmit text="Edit" />
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

export default Profile;

{
  /* <input
  {...register("test", {
    validate: value => value === '1' || 'error message'  // JS only: <p>error message</p> TS only support string
  })}
/>
// object of callback functions
<input
  {...register("test1", {
    validate: {
      positive: v => parseInt(v) > 0 || 'should be greater than 0',
      lessThanTen: v => parseInt(v) < 10 || 'should be lower than 10',
      // you can do asynchronous validation as well
      checkUrl: async () => await fetch() || 'error message',  // JS only: <p>error message</p> TS only support string
      messages: v => !v && ['test', 'test2']
    }
  })}
/> */
}
