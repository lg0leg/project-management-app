import React, { useState, FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IAuthRequest, IRegisterRequest } from 'model/typescript';
import AuthInput from 'components/AuthInput';
import AuthSubmit from 'components/AuthSubmit';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { fetchRegister } from 'app/actionCreators/authActionCreators';
import Spinner from 'components/Spinner';

export const SignUp: FC = () => {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { errorText, isError, isLoading } = useAppSelector((state) => state.authReducer);
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
    <div className="min-h-[100%] bg-gray-300">
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
          {isLoading && <Spinner />}
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
