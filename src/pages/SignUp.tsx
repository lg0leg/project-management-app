import React, { useState, FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IAuthRequest, IRegisterRequest } from 'model/typescript';
import AuthInput from 'components/AuthInput';
import AuthSubmit from 'components/AuthSubmit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchRegister } from 'app/actionCreators';
import { useNavigate } from 'react-router-dom';

export const SignUp: FC = () => {
  const nav = useNavigate();
  const navigate = (path: string) => nav(path);
  const dispatch = useAppDispatch();
  const { errorText, isError } = useAppSelector((state) => state.authReducer);
  const [lang] = useState('en');

  const name = lang === 'en' ? 'Your name:' : 'Ваше имя';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthRequest>();
  const onSubmit: SubmitHandler<IAuthRequest> = (res) => {
    const data = res as IRegisterRequest;
    dispatch(fetchRegister({ data, navigate }));
  };

  return (
    <div className="flex min-h-[calc(100vh-101px)] w-screen items-center justify-center bg-gray-50">
      <form className="rounded-xl border-2 border-gray-400 p-5" onSubmit={handleSubmit(onSubmit)}>
        {isError && (
          <div className="underline-offset-3 w-full text-center text-base font-medium text-red-500 underline underline-offset-2">
            {errorText}
          </div>
        )}
        <AuthInput
          label="name"
          title={name}
          placeholder="Name"
          register={register}
          type="text"
          minLength={2}
          maxLength={20}
          errors={errors}
        />
        <AuthInput
          label="login"
          title="Your login:"
          placeholder="Login"
          register={register}
          type="text"
          minLength={2}
          maxLength={20}
          errors={errors}
        />
        <AuthInput
          label="password"
          title="Password:"
          placeholder="Password"
          register={register}
          type="password"
          minLength={6}
          maxLength={20}
          errors={errors}
        />
        <AuthSubmit text="Sign up" />
      </form>
    </div>
  );
};

export default SignUp;
