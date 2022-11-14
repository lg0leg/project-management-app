import React, { useState } from 'react';
import Switcher from './switcher/switcher';
import { HiOutlineHome } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { RoutesPath } from 'constants/routes';
import { BiAddToQueue } from 'react-icons/bi';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';

import { logout } from 'app/actionCreators/authActionCreators';

export default function Header() {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const { lang } = useAppSelector((state) => state.langReducer);
  // const [lang] = useState('en');

  return (
    // <header className="sticky top-0 z-50 flex h-[100px] w-full items-center justify-between bg-slate-100 px-[20px]">
    <header className="sticky top-0 z-50 grid h-[100px] w-full grid-cols-[1fr] items-center  bg-slate-100 px-[20px] sm:grid-cols-[1fr_1fr_1fr]">
      <div className="flex gap-[20px] ">
        {isAuth == true ? (
          <NavLink to={RoutesPath.WELCOME}>
            <HiOutlineHome size={40} color="rgb(59, 130, 246, 1)" />
          </NavLink>
        ) : null}
        <div className="flex items-center gap-3 text-xl">
          <span className="text-blue-500">Рус</span>
          <Switcher />
          <span className="text-blue-500">En</span>
        </div>
      </div>

      {isAuth == true ? (
        <div className="hidden items-center justify-center sm:flex ">
          <button
            className="flex  gap-[5px]  rounded py-2 px-4 font-semibold  text-blue-500 hover:bg-blue-100"
            // onClick={() => {
            //   openCreateBoardmodal()
            //   console.log('новая доска');
            // }}
          >
            <BiAddToQueue size={30} color="rgb(59, 130, 246, 1)" />
            <p className="text-xl text-blue-500">
              {lang == 'en' ? 'Create board' : 'Добавить доску'}
            </p>
          </button>
        </div>
      ) : (
        <div></div>
      )}

      {isAuth ? <SignOut lang={lang} /> : <SignInSignUp lang={lang} />}
    </header>
  );
}

function SignInSignUp(props: { lang: string }) {
  return (
    <div className="flex justify-end gap-[10px]">
      <NavLink to={RoutesPath.SIGN_IN}>
        <button className="rounded border border-blue-700 bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          {props.lang == 'en' ? 'Sign in' : 'Войти'}
        </button>
      </NavLink>

      <NavLink to={RoutesPath.SIGN_UP}>
        <button className="rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white">
          {props.lang == 'en' ? 'Sign up' : 'Регистрация'}
        </button>
      </NavLink>
    </div>
  );
}

function SignOut(props: { lang: string }) {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  return (
    <div className="flex justify-end gap-[10px]">
      <div className="flex items-center pr-[26px] sm:hidden">
        <button
          className="flex  rounded  py-1 px-1 font-semibold text-blue-500  hover:bg-blue-100"
          // onClick={() => {
          //   openCreateBoardmodal()
          //   console.log('новая доска');
          // }}
        >
          <BiAddToQueue size={30} color="rgb(59, 130, 246, 1)" />
          {/* <p className="text-sm text-blue-500">{props.lang == 'en' ? 'Add ' : 'Добавить'}</p> */}
        </button>
      </div>

      <NavLink to={RoutesPath.PROFILE}>
        <button className="rounded border border-blue-700 bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          {props.lang == 'en' ? 'Profile' : 'Профиль'}
        </button>
      </NavLink>

      <button
        className="rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
        onClick={() => {
          dispatch(logout(navigate));
        }}
      >
        {props.lang == 'en' ? 'Sign out' : 'Выйти'}
      </button>
    </div>
  );
}
