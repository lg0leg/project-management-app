import { useAppSelector } from 'app/hooks';
import React, { FC, useState } from 'react';
import Rocket from '../assets/images/rocket.png';
import { CiYoutube } from 'react-icons/ci';
import { SiTailwindcss, SiReact, SiRedux, SiTypescript, SiReactrouter } from 'react-icons/si';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Screen1 from '../assets/screenshots/screen1.png';
import { Flowbite } from '../components/icons/Flowbite';
import { HelloPangea } from 'components/icons/HelloPangea';
// import { ReactHookForm } from 'components/icons/ReactHookForm';

export const Welcome: FC = () => {
  const { lang } = useAppSelector((state) => state.langReducer);
  const [showVideo, setShowVideo] = useState(false);

  const h4Styles = 'text-lg font-bold text-blue-500 sm:text-xl lg:text-4xl';
  // const carouselDescriptionStyles =
  //   'legend color !bottom-[10px] !ml-[-40%] !w-[80%] !bg-white !p-[5px] !text-sm !text-blue-500 !opacity-100 shadow-xl sm:!p-[15px] sm:!text-xl';
  const carouselDescriptionStyles =
    'legend color !bottom-[0px] !ml-[-50%] !w-[100%] !bg-white !p-[4px] !text-xs !text-blue-500 !opacity-100  sm:!p-[15px] sm:!text-xl';

  return (
    <>
      <div className="min-h-[calc(100vh-100px-80px)] bg-gradient-to-r from-gray-50 to-blue-100 pb-[30px]">
        <section className="flex flex-col items-center justify-center gap-[30px] px-[40px] pt-[100px] sm:flex-row">
          <h2 className="text-xl font-bold text-blue-500 sm:text-3xl lg:text-5xl">
            {lang == 'en' ? 'Accelerate your work ' : 'Ускорь свою работу '}
            <br />
            {lang == 'en' ? 'with Rocket Task Sheduler!' : 'вместе с Rocket Task Sheduler!'}
          </h2>
          <img className="h-[100px] sm:h-[200px] lg:h-[360px]" src={Rocket} alt="rocket" />
        </section>

        <section className="flex flex-col items-center justify-center gap-[30px] pt-[100px]">
          <h4 className={h4Styles}>{lang == 'en' ? 'How does it work?' : 'Как это работает?'}</h4>
          <div className="w-[80%] sm:w-[50%]">
            <Carousel
              dynamicHeight={true}
              emulateTouch={true}
              infiniteLoop={true}
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
            >
              <div>
                <img src={Screen1} className="rounded-xl " />
                <p className={carouselDescriptionStyles}>
                  {lang == 'en'
                    ? 'Step 1 -  Create an account. Just a username and password, nothing else!'
                    : 'Шаг 1. Создай аккаунт. Только логин и пароль, ничего лишнего!'}
                </p>
              </div>
              <div>
                <img src={Screen1} className="rounded-xl " />
                <p className={carouselDescriptionStyles}>{lang == 'en' ? 'Step 2' : 'Шаг 2'}</p>
              </div>
              <div>
                <img src={Screen1} className="rounded-xl " />
                <p className={carouselDescriptionStyles}>{lang == 'en' ? 'Step 3' : 'Шаг 3'}</p>
              </div>
              <div>
                <img src={Screen1} className="rounded-xl " />
                <p className={carouselDescriptionStyles}>{lang == 'en' ? 'Step 4' : 'Шаг 4'}</p>
              </div>
              <div>
                <img src={Screen1} className="rounded-xl " />
                <p className={carouselDescriptionStyles}>{lang == 'en' ? 'Step 5' : 'Шаг 5'}</p>
              </div>
            </Carousel>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center px-[40px] pt-[100px]">
          <h4 className={h4Styles}>{lang == 'en' ? 'How is it done?' : 'Как это сделано?'}</h4>
          <div className="flex flex-wrap items-center justify-center gap-[10px] py-[10px] sm:gap-[30px] sm:py-[30px]">
            <HelloPangea size={60} color={'rgb(59, 130, 246, 1)'} />
            <SiTailwindcss size={50} color={'rgb(59, 130, 246, 1)'} />
            {/* <ReactHookForm size={60} /> */}
            <SiReact size={50} color={'rgb(59, 130, 246, 1)'} />
            <SiRedux size={50} color={'rgb(59, 130, 246, 1)'} />
            <SiTypescript size={50} color={'rgb(59, 130, 246, 1)'} />
            <SiReactrouter size={50} color={'rgb(59, 130, 246, 1)'} />
            <Flowbite size={50} />
          </div>
        </section>

        <section className="flex flex-col items-center justify-center gap-[10px] px-[25px] pt-[100px] sm:gap-[30px] sm:px-[50px]">
          <h4 className={h4Styles}>
            {lang == 'en'
              ? 'How can I learn to make apps that are as cool as they are?'
              : 'Как я могу научится делать такие же крутые приложения?'}
          </h4>
          <p className="text-md font-semibold text-gray-500 sm:text-lg lg:text-3xl">
            {lang == 'en' ? 'In a free course from ' : 'На бесплатных курсах от '}
            <a
              className="font-bold"
              href="https://rs.school/index.html"
              target="_blank"
              rel="noreferrer"
            >
              Rolling Scopes School
            </a>
            {lang == 'en' ? ', of course!' : ', конечно же!'}
          </p>
        </section>

        <section className="flex flex-col items-center gap-[20px] px-[30px] pt-[100px] text-center">
          <h4 className={h4Styles}>
            {lang == 'en'
              ? 'Want to learn more about the app? '
              : 'Хочешь узнать больше о приложении? '}
            <br />
            {lang == 'en' ? 'Watch this video!' : 'Смотри видео!'}
          </h4>
          {showVideo == false ? (
            <CiYoutube
              className="h-[100px] w-[100px] cursor-pointer hover:opacity-90 sm:h-[150px] sm:w-[150px]"
              color={'rgb(59, 130, 246, 1)'}
              onClick={() => setShowVideo(true)}
            />
          ) : (
            <div className="relative flex h-0 w-[80%] justify-center overflow-hidden pb-[45%] shadow-lg sm:w-[50%] sm:pb-[28%]">
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
