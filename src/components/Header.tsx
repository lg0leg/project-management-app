import { RefObject, useEffect, useRef, useState } from 'react';
import Switcher from './switcher/switcher';
import { HiOutlineHome, HiOutlineClipboardList } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { RoutesPath } from 'constants/routes';
import { BiAddToQueue } from 'react-icons/bi';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { logout } from 'app/actionCreators/authActionCreators';
import CreateBoardPopup from './CreateBoardPopup';

export default function Header() {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const { lang } = useAppSelector((state) => state.langReducer);
  const [popupVisible, setPopupVisible] = useState(false);
  const headerRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let scroll = 0;

    window.onscroll = () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        if (scroll >= window.scrollY && window.scrollY < 10) {
          headerRef.current!.classList.remove('h-[85px]');
        } else {
          headerRef.current!.classList.add('h-[85px]');
        }

        scroll = window.scrollY;
      }, 10);
    };
  }, []);

  return (
    <header
      className="transition-height sticky top-0 z-50 grid h-[100px] w-full grid-cols-[1fr] items-center bg-slate-100 px-[20px] duration-500 sm:grid-cols-[1fr_1fr_1fr]"
      ref={headerRef}
    >
      <div className="flex gap-[10px] ">
        {isAuth == true ? (
          <NavLink to={RoutesPath.WELCOME}>
            <HiOutlineHome size={40} color="rgb(59, 130, 246, 1)" />
          </NavLink>
        ) : null}
        {isAuth == true ? (
          <NavLink to={RoutesPath.BOARDS}>
            <HiOutlineClipboardList size={40} color="rgb(59, 130, 246, 1)" />
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
            className="flex gap-[5px] rounded py-2 px-4 font-semibold text-blue-500 hover:bg-blue-100"
            onClick={() => {
              setPopupVisible(true);
            }}
          >
            <BiAddToQueue size={30} color="rgb(59, 130, 246, 1)" />
            <p className="text-left text-xl text-blue-500">
              {lang == 'en' ? 'Create board' : 'Добавить доску'}
            </p>
          </button>
        </div>
      ) : (
        <div></div>
      )}

      {isAuth ? (
        <SignOut lang={lang} setPopupVisible={setPopupVisible} />
      ) : (
        <SignInSignUp lang={lang} />
      )}

      <CreateBoardPopup popupVisible={popupVisible} setPopupVisible={setPopupVisible} />
    </header>
  );
}

function SignInSignUp(props: { lang: string }) {
  return (
    <div className="flex justify-end gap-[10px]">
      <NavLink to={RoutesPath.SIGN_IN}>
        <button className="rounded border border-blue-700 bg-blue-500 py-1 px-2 font-bold text-white hover:bg-blue-700 sm:py-2 sm:px-4">
          {props.lang == 'en' ? 'Sign in' : 'Войти'}
        </button>
      </NavLink>

      <NavLink to={RoutesPath.SIGN_UP}>
        <button className="rounded border border-blue-500 bg-transparent py-1 px-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white sm:py-2 sm:px-4">
          {props.lang == 'en' ? 'Sign up' : 'Регистрация'}
        </button>
      </NavLink>
    </div>
  );
}

function SignOut(props: { lang: string; setPopupVisible: (arg: boolean) => void }) {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  return (
    <div className="flex justify-end gap-[10px]">
      <div className="flex items-center sm:hidden">
        <button
          className="flex  rounded  py-1 px-1 font-semibold text-blue-500  hover:bg-blue-100"
          onClick={() => {
            props.setPopupVisible(true);
          }}
        >
          <BiAddToQueue size={30} color="rgb(59, 130, 246, 1)" />
          {/* <p className="text-sm text-blue-500">{props.lang == 'en' ? 'Add ' : 'Добавить'}</p> */}
        </button>
      </div>

      <NavLink to={RoutesPath.PROFILE}>
        <button className="rounded border border-blue-700 bg-blue-500 py-1 px-2 font-bold text-white hover:bg-blue-700 sm:py-2 sm:px-4">
          {props.lang == 'en' ? 'Profile' : 'Профиль'}
        </button>
      </NavLink>

      <button
        className="h-[34px] rounded border border-blue-500 bg-transparent py-1 px-3 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white sm:h-full sm:py-2 sm:px-4"
        onClick={() => {
          dispatch(logout(navigate));
        }}
      >
        {props.lang == 'en' ? 'Sign out' : 'Выйти'}
      </button>
    </div>
  );
}
