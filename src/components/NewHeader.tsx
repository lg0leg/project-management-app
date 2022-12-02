import { RefObject, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { RoutesPath } from 'constants/routes';
import { BiAddToQueue } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';
import Rocket from '../assets/images/rocket.png';
import { logout } from 'app/actionCreators/authActionCreators';
import CreateBoardPopup from './CreateBoardPopup';
import { decodeToken } from 'react-jwt';
import { IToken } from 'models/typescript';
import { LangKey } from 'constants/lang';
import { changeLang } from 'app/actionCreators/langActionCreators';
import { useWindowSize } from 'utils/useWindowSize';

export const NewHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const { lang } = useAppSelector((state) => state.langReducer);
  const { isAuth, token } = useAppSelector((state) => state.authReducer);
  const { users } = useAppSelector((state) => state.userReducer);
  const currentUserId = token ? (decodeToken(token) as IToken).id : '';
  const curUser = users.find((user) => user._id === currentUserId);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [width] = useWindowSize();
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
          headerRef.current!.classList.remove('py-1');
        } else {
          headerRef.current!.classList.add('py-1');
        }

        scroll = window.scrollY;
      }, 10);
    };
  }, []);

  useEffect(() => {
    if (width >= 768) setIsMobileOpen(false);
  }, [width]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className="sticky top-0 z-50 rounded border-gray-200 bg-white px-2 py-2.5 duration-500 sm:px-12"
        ref={headerRef}
      >
        <div className="container relative mx-auto flex  flex-wrap items-center justify-between">
          <NavLink to={RoutesPath.WELCOME} className="flex items-center">
            <img className="ml-3 h-6 md:ml-0 md:h-9" src={Rocket} alt="Rocket logo" />
            <span className="ml-3 text-xl font-semibold md:ml-3 md:block md:self-center md:whitespace-nowrap md:text-xl md:font-semibold">
              Rocket
            </span>
          </NavLink>

          <div className="flex items-center md:order-2">
            <Popover
              isOpen={isLangOpen}
              positions={['bottom', 'left', 'top', 'right']}
              onClickOutside={() => setIsLangOpen((prev) => !prev)}
              content={
                <div
                  className="z-50 my-4 list-none divide-y divide-gray-100 rounded bg-white text-base shadow"
                  id="language-dropdown-menu"
                >
                  <ul className="py-1" role="none">
                    <li>
                      <div
                        onClick={() => dispatch(changeLang({ lang: LangKey.EN }))}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="inline-flex items-center">
                          {lang === LangKey.EN ? 'English (EN)' : 'Английский (EN)'}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div
                        onClick={() => dispatch(changeLang({ lang: LangKey.RU }))}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="inline-flex items-center">
                          {lang === LangKey.EN ? 'Russian (RU)' : 'Русский (RU)'}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              }
            >
              <button
                type="button"
                onClick={() => {
                  setIsLangOpen((prev) => !prev);
                  setIsMobileOpen(false);
                }}
                className="inline-flex cursor-pointer items-center justify-center rounded p-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                {lang === LangKey.EN ? 'English (EN)' : 'Русский (RU)'}
              </button>
            </Popover>

            {isAuth && (
              <Popover
                isOpen={isProfileOpen}
                positions={['bottom', 'left', 'top', 'right']}
                onClickOutside={() => setIsProfileOpen((prev) => !prev)}
                content={
                  <div
                    id="user-dropdown"
                    className="z-50 my-4 list-none divide-y divide-gray-100 rounded bg-white text-base shadow"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900">{curUser && curUser.name}</span>
                      <span className="block truncate text-sm font-medium text-gray-500">
                        {curUser && curUser.login}
                      </span>
                    </div>
                    <ul className="py-1" aria-labelledby="user-menu-button">
                      <li>
                        <NavLink
                          to={RoutesPath.PROFILE}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {lang === LangKey.EN ? 'Profile' : 'Профиль'}
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            dispatch(logout(navigate));
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {lang === LangKey.EN ? 'Sign out' : 'Выйти'}
                        </button>
                      </li>
                    </ul>
                  </div>
                }
              >
                <button
                  type="button"
                  className=" ml-3 flex rounded-full bg-gray-200 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0"
                  id="user-menu-button"
                  aria-expanded="false"
                  onClick={() => {
                    setIsProfileOpen((prev) => !prev);
                    setIsMobileOpen(false);
                  }}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full">
                    {curUser && (
                      <span className="text-sm font-medium text-gray-600">
                        {curUser.login.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </button>
              </Popover>
            )}

            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {isAuth ? (
            <nav
              className={`${
                isMobileOpen
                  ? 'fixed left-[2.5%] top-16 z-50 opacity-100 duration-500 ease-in-out'
                  : 'fixed -top-40 opacity-0'
              } w-[95%] items-center justify-between md:static md:order-1 md:flex md:w-auto md:opacity-100`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col rounded-lg border-2 border-gray-300 bg-gray-100 p-2 md:mt-0 md:flex-row md:items-center md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
                <li>
                  <NavLink
                    to={RoutesPath.WELCOME}
                    aria-current="page"
                    onClick={() => setIsMobileOpen(false)}
                    className="mb-1 block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 "
                  >
                    {lang === LangKey.EN ? 'Welcome' : 'О нас'}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={RoutesPath.BOARDS}
                    aria-current="page"
                    onClick={() => setIsMobileOpen(false)}
                    className="mb-1 block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                  >
                    {lang === LangKey.EN ? 'Boards' : 'Доски'}
                  </NavLink>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setPopupVisible(true);
                      setIsMobileOpen(false);
                    }}
                    className="inline-flex w-full items-center rounded bg-blue-700 py-2 pl-3 pr-4 text-white hover:bg-blue-800 md:px-4 md:py-2"
                  >
                    <BiAddToQueue size={20} />
                    <p className="ml-2">
                      {lang === LangKey.EN ? 'Create board' : 'Добавить доску'}
                    </p>
                  </button>
                </li>
              </ul>
            </nav>
          ) : (
            <nav
              className={`${
                isMobileOpen ? 'absolute top-14' : 'hidden'
              } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:items-center md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
                <li>
                  <NavLink
                    to={RoutesPath.SIGN_IN}
                    aria-current="page"
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 "
                  >
                    {lang === LangKey.EN ? 'Sign in' : 'Вход'}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={RoutesPath.SIGN_UP}
                    aria-current="page"
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                  >
                    {lang === LangKey.EN ? 'Sign up' : 'Регистрация'}
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
        </div>

        <CreateBoardPopup popupVisible={popupVisible} setPopupVisible={setPopupVisible} />
      </div>
    </header>
  );
};
export default NewHeader;
