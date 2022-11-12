import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IAuthRequest } from 'model/typescript';
import AuthInput from 'components/AuthInput';
import AuthSubmit from 'components/AuthSubmit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchLogin } from 'app/actionCreators';

export const SignIn: FC = () => {
  const dispatch = useAppDispatch();
  const { errorText, isError } = useAppSelector((state) => state.authReducer);
  const { register, handleSubmit } = useForm<IAuthRequest>();
  const onSubmit: SubmitHandler<IAuthRequest> = (data) => {
    dispatch(fetchLogin(data));
  };
  console.log(isError);
  console.log(errorText);
  return (
    <div className="flex min-h-[calc(100vh-101px)] w-screen items-center justify-center bg-gray-50">
      <form className="rounded-xl border-2 border-gray-400 p-5" onSubmit={handleSubmit(onSubmit)}>
        {isError && <div className="w-full text-base text-red-500">{errorText}</div>}
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
        <AuthSubmit text="Sign in" />
        <p className="pt-3 text-sm font-light text-gray-600">
          Don’t have an account yet?
          <Link to="/register" className="pl-2 font-bold text-gray-600 hover:text-blue-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
