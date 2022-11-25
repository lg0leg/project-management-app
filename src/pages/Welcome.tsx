import { useAppSelector } from 'app/hooks';
import React, { FC, useState } from 'react';
import Rocket from '../assets/images/rocket.png';
import { CiYoutube } from 'react-icons/ci';

export const Welcome: FC = () => {
  const { lang } = useAppSelector((state) => state.langReducer);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <div className="min-h-[calc(100vh-100px-80px)] bg-gradient-to-r from-gray-50 to-blue-100 pb-[30px]">
        <section className="flex flex-col items-center justify-center gap-[30px] py-[100px] px-[40px] sm:flex-row">
          <h2 className="text-xl font-bold text-blue-500 sm:text-3xl lg:text-5xl">
            {lang == 'en' ? 'Accelerate your work ' : 'Ускорь свою работу '}
            <br />
            {lang == 'en' ? 'with Rocket Task Sheduler!' : 'вместе с Rocket Task Sheduler!'}
          </h2>
          <img className="h-[100px] sm:h-[200px] lg:h-[360px]" src={Rocket} alt="rocket" />
        </section>

        <section className="flex flex-col items-center gap-[20px] px-[30px]">
          <h4 className="text-lg font-bold text-blue-500 sm:text-xl lg:text-4xl">
            {lang == 'en'
              ? 'Want to learn more about the app? Watch the video!'
              : 'Хочешь узнать больше о приложении? Смотри видео!'}
          </h4>
          {showVideo == false ? (
            <CiYoutube
              className="h-[150px] w-[150px] cursor-pointer hover:opacity-90"
              color={'rgb(59, 130, 246, 1)'}
              onClick={() => setShowVideo(true)}
            />
          ) : (
            <div className="relative flex h-0 w-[50%] justify-center overflow-hidden pb-[28%] shadow-lg">
              <iframe
                className="t-0 l-0 absolute h-full w-full rounded-lg"
                loading="lazy"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
