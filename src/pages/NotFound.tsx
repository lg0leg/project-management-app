import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import NotFoundImage from '../assets/images/NotFound.jpg';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { RoutesPath } from 'constants/routes';

export const NotFound: FC = () => {
  // TODO - context lang change
  const [lang, setLang] = useState('en');

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 pb-6">
      <div className="mb-7 block max-w-lg text-right text-xs font-medium">
        <img src={NotFoundImage} alt="Page not Found" />
        <i>
          <a
            className="text-blue-700 hover:underline"
            href="https://www.freepik.com/free-vector/404-error-with-landscape-concept-illustration_20602785.htm#query=404&position=3&from_view=keyword"
            target="_blank"
            rel="noreferrer noopener"
          >
            {lang === 'en' ? 'Image by ' : 'Изображение от '}storyset
          </a>{' '}
          {lang === 'en' ? 'on' : 'c'} Freepik
        </i>
      </div>
      <div className="block text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:mb-5 sm:text-5xl">
          {lang === 'en' ? 'Page not found' : 'Страница не найдена'}
        </h1>
        <p className="mx-auto mb-5 text-sm font-normal text-gray-500 sm:w-4/5 sm:text-lg">
          {lang === 'en'
            ? 'Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.'
            : 'Ой! Похоже вы перешли по неправильной ссылке. Если вам кажется что проблема с нашим сайтом, пожалуйста, свяжитесь с нами.'}
        </p>
        <NavLink
          className="mr-3 inline-flex items-center rounded-lg bg-blue-700 py-1 px-2.5 text-center text-xs font-medium text-white sm:py-2.5 sm:px-5 sm:text-sm"
          to={RoutesPath.BOARDS}
        >
          <MdKeyboardArrowLeft className="-ml-1 mr-2 h-5 w-5" />
          {lang === 'en' ? 'Go back Home' : 'Вернутся на главную'}
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
