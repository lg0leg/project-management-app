import { useState } from 'react';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { RoutesPath } from 'constants/routes';
import { BiAddToQueue } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';
import Rocket from '../assets/images/rocket.png';
import { logout } from 'app/actionCreators/authActionCreators';
import CreateBoardPopup from './CreateBoardPopup';

export const NewHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const { user } = useAppSelector((state) => state.userReducer);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <header className="rounded border-gray-200 bg-white px-2 py-2.5 sm:px-4">
      <div className="container relative mx-auto flex flex-wrap items-center justify-between">
        <NavLink to={RoutesPath.WELCOME} className="flex items-center">
          <img className="ml-3 h-6 md:ml-0 md:h-9" src={Rocket} alt="Rocket logo" />
          <span className="hidden md:ml-3 md:block md:self-center md:whitespace-nowrap md:text-xl md:font-semibold">
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
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="inline-flex items-center">
                        <svg
                          aria-hidden="true"
                          className="mr-2 h-3.5 w-3.5 rounded-full"
                          xmlns="http://www.w3.org/2000/svg"
                          id="flag-icon-css-us"
                          viewBox="0 0 512 512"
                        >
                          <g fillRule="evenodd">
                            <g strokeWidth="1pt">
                              <path
                                fill="#bd3d44"
                                d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                                transform="scale(3.9385)"
                              />
                              <path
                                fill="#fff"
                                d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                                transform="scale(3.9385)"
                              />
                            </g>
                            <path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)" />
                            <path
                              fill="#fff"
                              d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                              transform="scale(3.9385)"
                            />
                          </g>
                        </svg>
                        English (US)
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="inline-flex items-center">
                        <svg
                          className="mr-2 h-3.5 w-3.5 rounded-full"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          id="flag-icon-css-de"
                          viewBox="0 0 512 512"
                        >
                          <path fill="#ffce00" d="M0 341.3h512V512H0z" />
                          <path d="M0 0h512v170.7H0z" />
                          <path fill="#d00" d="M0 170.7h512v170.6H0z" />
                        </svg>
                        Russian (RU)
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            }
          >
            <button
              type="button"
              onClick={() => setIsLangOpen((prev) => !prev)}
              className="inline-flex cursor-pointer items-center justify-center rounded p-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <svg
                className="mr-2 h-5 w-5 rounded-full"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 3900 3900"
              >
                <path fill="#b22234" d="M0 0h7410v3900H0z" />
                <path
                  d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
                  stroke="#fff"
                  strokeWidth="300"
                />
                <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
                <g fill="#fff">
                  <g id="d">
                    <g id="c">
                      <g id="e">
                        <g id="b">
                          <path
                            id="a"
                            d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                          />
                          <use xlinkHref="#a" y="420" />
                          <use xlinkHref="#a" y="840" />
                          <use xlinkHref="#a" y="1260" />
                        </g>
                        <use xlinkHref="#a" y="1680" />
                      </g>
                      <use xlinkHref="#b" x="247" y="210" />
                    </g>
                    <use xlinkHref="#c" x="494" />
                  </g>
                  <use xlinkHref="#d" x="988" />
                  <use xlinkHref="#c" x="1976" />
                  <use xlinkHref="#e" x="2470" />
                </g>
              </svg>
              English (US)
            </button>
          </Popover>

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
                  <span className="block text-sm text-gray-900">{user && user.name}</span>
                  <span className="block truncate text-sm font-medium text-gray-500">
                    {user && user.login}
                  </span>
                </div>
                <ul className="py-1" aria-labelledby="user-menu-button">
                  <li>
                    <NavLink
                      to={RoutesPath.PROFILE}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        dispatch(logout(navigate));
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
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
              onClick={() => setIsProfileOpen((prev) => !prev)}
            >
              <span className="sr-only">Open user menu</span>
              <div className="relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full">
                {user && (
                  <span className="text-sm font-medium text-gray-600">
                    {user.login.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </button>
          </Popover>

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

        <nav
          className={`${
            isMobileOpen ? 'absolute top-14' : 'hidden'
          } w-full items-center justify-between md:order-1 md:flex md:w-auto`}
          id="mobile-menu-2"
        >
          <ul className="rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:items-center md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
            <li>
              <NavLink
                to={RoutesPath.WELCOME}
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 "
                aria-current="page"
              >
                Welcome
              </NavLink>
            </li>
            <li>
              <NavLink
                to={RoutesPath.BOARDS}
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
              >
                Boards
              </NavLink>
            </li>
            <li>
              <div
                onClick={() => {
                  setPopupVisible(true);
                }}
                // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center mr-3 md:mr-0 "
                className="inline-flex w-full items-center rounded bg-blue-700 py-2 pl-3 pr-4 text-white hover:bg-blue-800 md:px-5 md:py-2.5"
              >
                <BiAddToQueue size={20} />
                <p className="ml-2">Create board</p>
              </div>
            </li>
          </ul>
        </nav>
        {/* <nav
          className={
            !isMobileOpen
              ? 'fixed left-0 top-0 w-full items-center justify-between md:relative md:order-1 md:flex md:w-auto'
              : 'fixed top-[-100%]'
          }
          id="mobile-menu-2"
        >
          <ul className="flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:items-center md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
            <li>
              <NavLink
                to={RoutesPath.WELCOME}
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 "
                aria-current="page"
              >
                Welcome
              </NavLink>
            </li>
            <li>
              <NavLink
                to={RoutesPath.BOARDS}
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
              >
                Boards
              </NavLink>
            </li>
            <li>
              <div
                onClick={() => {
                  setPopupVisible(true);
                }}
                // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center mr-3 md:mr-0 "
                className="inline-flex w-full items-center rounded bg-blue-700 py-2 pl-3 pr-4 text-white hover:bg-blue-800 md:px-5 md:py-2.5"
              >
                <BiAddToQueue size={20} />
                <p className="ml-2">Create board</p>
              </div>
            </li>
          </ul>
        </nav> */}
      </div>

      <CreateBoardPopup popupVisible={popupVisible} setPopupVisible={setPopupVisible} />
    </header>
  );
};
export default NewHeader;
