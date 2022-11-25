import { useAppSelector } from 'app/hooks';
import React, { FC } from 'react';
import Rocket from '../assets/images/rocket.png';

export const Welcome: FC = () => {
  const { lang } = useAppSelector((state) => state.langReducer);

  return (
    <>
      <div className="min-h-[calc(100vh-100px-80px)] bg-gradient-to-r from-gray-50 to-blue-100">
        <div className="flex flex-col items-center justify-center gap-[30px] py-[100px] px-[40px] sm:flex-row">
          <h2 className="text-xl font-bold text-blue-500 sm:text-3xl lg:text-5xl">
            {lang == 'en' ? 'Accelerate your work ' : 'Ускорь свою работу '}
            <br />
            {lang == 'en' ? 'with Rocket Task Sheduler!' : 'вместе с Rocket Task Sheduler!'}
          </h2>
          <img className="h-[100px] sm:h-[200px] lg:h-[360px]" src={Rocket} alt="rocket" />
        </div>
      </div>
    </>
  );
};
