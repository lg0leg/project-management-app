import React, { useState, FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IAuthRequest, IRegisterRequest } from 'model/typescript';
import AuthInput from 'components/AuthInput';
import AuthSubmit from 'components/AuthSubmit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchRegister } from 'app/actionCreators';

export const SignUp: FC = () => {
  const dispatch = useAppDispatch();
  const { errorText, isError } = useAppSelector((state) => state.authReducer);
  const [lang] = useState('en');

  const name = lang === 'en' ? 'Your name:' : 'Ваше имя';

  const { register, handleSubmit } = useForm<IAuthRequest>();
  const onSubmit: SubmitHandler<IAuthRequest> = (data) => {
    dispatch(fetchRegister(data as IRegisterRequest));
  };

  return (
    <div className="flex min-h-[calc(100vh-101px)] w-screen items-center justify-center bg-gray-50">
      <form className="rounded-xl border-2 border-gray-400 p-5" onSubmit={handleSubmit(onSubmit)}>
        {isError && <div className="w-full text-base text-red-500">{errorText}</div>}
        <AuthInput
          label="name"
          title={name}
          placeholder="Name"
          register={register}
          type="text"
          minLength={2}
          maxLength={20}
        />
        <AuthInput
          label="login"
          title="Your login:"
          placeholder="Login"
          register={register}
          type="text"
          minLength={2}
          maxLength={20}
        />
        <AuthInput
          label="password"
          title="Password:"
          placeholder="Password"
          register={register}
          type="password"
          minLength={2}
          maxLength={20}
        />
        <AuthSubmit text="Sign up" />
      </form>
    </div>
  );
};

export default SignUp;
