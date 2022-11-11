import React, { useState } from 'react';
import rslogo from './../assets/svg/rs_school_js.svg';
import { VscGithubAlt } from 'react-icons/vsc';
import { SlSocialGithub } from 'react-icons/sl';

export default function Footer() {
  const [lang, setLang] = useState('en');

  return (
    <div className="flex flex-col sm:flex-row bg-slate-400 text-amber-400 justify-around items-center p-[20px] text-2xl gap-[40px] sm:gap-[0px]">
      <div className="hover:scale-105 transition duration-300">
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <img className="w-[100px]" src={rslogo} alt="rs logo" />
        </a>
      </div>
      <ul className=" flex flex-col sm:flex-row gap-[10px] sm:gap-[30px] text-center">
        <li className="flex gap-[5px] items-center hover:text-amber-500 transition duration-300">
          <SlSocialGithub />
          <a href="https://github.com/NikitaKakurin" target="_blank" rel="noreferrer">
            {lang == 'en' ? 'Nikita' : 'Никита'}
          </a>
        </li>
        <li className="flex gap-[5px] items-center hover:text-amber-500 transition duration-300">
          <VscGithubAlt />
          <a href="https://github.com/bycolour2" target="_blank" rel="noreferrer">
            {lang == 'en' ? 'Rustam' : 'Рустам'}
          </a>
        </li>
        <li className="flex gap-[5px] items-center hover:text-amber-500 transition duration-300">
          <VscGithubAlt />
          <a href="https://github.com/lg0leg" target="_blank" rel="noreferrer">
            {lang == 'en' ? 'Oleg' : 'Олег'}
          </a>
        </li>
      </ul>
      <p className="w-[100px] text-center">©2022</p>
    </div>
  );
}
