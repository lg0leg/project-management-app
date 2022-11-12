import React, { useState } from 'react';
import Switcher from 'utils/switcher/switcher';
import { HiOutlineHome } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-[100px] w-full items-center justify-between bg-slate-100 px-[20px]">
      <NavLink to="/welcome">
        <HiOutlineHome size={40} color="rgb(59, 130, 246, 1)" />
      </NavLink>
      <div className="flex items-center gap-3 text-xl">
        <span className="text-blue-500">Рус</span>
        <Switcher />
        <span className="text-blue-500">En</span>
      </div>
      <div className="flex gap-1">
        <button className="rounded border border-blue-700 bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          Войти
        </button>
        <button className="rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white">
          Регистрация
        </button>
      </div>
    </header>
  );
}
