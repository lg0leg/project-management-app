import { logout } from 'app/actionCreators/authActionCreators';
import {
  fetchDeleteUser,
  fetchGetUser,
  fetchGetUsers,
  fetchUpdateUser,
} from 'app/actionCreators/userActionCreator';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import Spinner from 'components/Spinner';
import { LangKey } from 'constants/lang';
import type { IToken } from 'models/typescript';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { isExpired, decodeToken } from 'react-jwt';
interface IUserInput {
  name: string;
  login: string;
  password: string;
}

export default function TestPage() {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IUserInput>();
  const { user, users, isLoading, isError, httpCode } = useAppSelector(
    (state) => state.userReducer
  );
  const { lang } = useAppSelector((state) => state.langReducer);
  const { _id } = user;
  let errorText = '';
  if (httpCode === 409) {
    errorText = lang === LangKey.EN ? 'This login already exists' : 'Такой логин уже существует';
  }

  //такую проверку добавить на boards, board, и welcome page
  const { token } = useAppSelector((state) => state.authReducer);
  useEffect(() => {
    if (isExpired(token)) {
      dispatch(logout(navigate));
    }
  });
  //--------------------------------------------------------
  useEffect(() => {
    if (isExpired(token)) {
      dispatch(logout(navigate));
    } else {
      const { id: _id } = decodeToken(token) as IToken;
      dispatch(fetchGetUser({ _id, navigate }));
    }
  }, [token]);

  const getUsers = () => {
    dispatch(fetchGetUsers(navigate));
  };

  const getUser = () => {
    dispatch(fetchGetUser({ _id: user._id, navigate }));
  };

  const updateUser: SubmitHandler<IUserInput> = (data) => {
    console.log(data);
    const newLogin = data.login || user.login;
    const newName = data.name || user.name;
    dispatch(
      fetchUpdateUser({ _id, login: newLogin, name: newName, password: data.password, navigate })
    );
  };

  const deleteUser = () => {
    dispatch(fetchDeleteUser({ _id, navigate }));
  };

  return (
    <div className="w-full border-2">
      <h2 className="ml-auto mr-auto">userReduser</h2>
      {isLoading && <Spinner />}
      {isError && <p className="text-[20px] font-semibold text-red-500">{errorText}</p>}
      <div className="mb-4 flex">
        <h2>get users</h2>
        <button className="w-[100px] bg-blue-500" onClick={getUsers}>
          get users
        </button>
        <div className="max-h-[400]">
          {users.map((item) => {
            return (
              <div key={`${item._id}`}>
                <hr />
                <p>{item.name}</p>
                <p>{item.login}</p>
                <p>{item._id}</p>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="mb-4 flex">
        <h2>get user</h2>
        <button className="w-[100px] bg-blue-500" onClick={getUser}>
          get user
        </button>
        <div>
          <p>{user.name}</p>
          <p>{user.login}</p>
          <p>{user._id}</p>
        </div>
      </div>
      <hr />
      <form className="mb-4 flex flex-col" onSubmit={handleSubmit(updateUser)}>
        <h2>update user</h2>
        <button className="w-[100px] bg-blue-500" onClick={getUser}>
          update user
        </button>
        <span className="flex flex-col">id:{user._id}</span>
        <label className="flex flex-col">
          <span>username:{user.name}, enter new name:</span>
          <input type="text" className="w-[200px] border-2" {...register('name')} />
        </label>
        <label>
          <span className="flex flex-col">login:{user.login}, enter new login:</span>
          <input type="text" className="w-[200px] border-2" {...register('login')} />
        </label>
        <label>
          <span className="flex flex-col">enter new password:</span>
          <input type="password" className="w-[200px] border-2" {...register('password')} />
        </label>
      </form>
      <hr />
      <div className="flex">
        <h2>delete user</h2>
        <button className="w-[100px] bg-blue-500" onClick={deleteUser}>
          delete user
        </button>
      </div>
    </div>
  );
}