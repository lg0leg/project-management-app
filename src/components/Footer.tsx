import rslogo from './../assets/svg/logoBlue.svg';
import { VscGithubAlt } from 'react-icons/vsc';
import { SlSocialGithub } from 'react-icons/sl';
import { useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';

export default function Footer() {
  const { lang } = useAppSelector((state) => state.langReducer);

  return (
    <footer className="grid h-[80px] grid-cols-2 bg-slate-100 py-[10px] px-[30px] text-gray-800 sm:flex sm:items-center sm:justify-between sm:p-[20px]">
      <div className=" w-[70px] transition duration-300 hover:rotate-3 sm:w-[100px]">
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <img src={rslogo} alt="rs logo" />
        </a>
      </div>

      <p className="w-[100px] justify-self-end text-right text-lg sm:hidden">©2022</p>

      <ul className="col-span-2 flex w-full justify-center gap-[10px] text-center text-lg sm:gap-[30px] sm:text-2xl">
        <li className="flex items-center gap-[5px] transition duration-300 hover:text-blue-500">
          <SlSocialGithub />
          <a href="https://github.com/NikitaKakurin" target="_blank" rel="noreferrer">
            {lang == LangKey.EN ? 'Nikita' : 'Никита'}
          </a>
        </li>
        <li className="flex items-center gap-[5px] transition duration-300 hover:text-blue-500">
          <VscGithubAlt />
          <a href="https://github.com/bycolour2" target="_blank" rel="noreferrer">
            {lang == LangKey.EN ? 'Rustam' : 'Рустам'}
          </a>
        </li>
        <li className="flex items-center gap-[5px] transition duration-300 hover:text-blue-500">
          <VscGithubAlt />
          <a href="https://github.com/lg0leg" target="_blank" rel="noreferrer">
            {lang == LangKey.EN ? 'Oleg' : 'Олег'}
          </a>
        </li>
      </ul>

      <p className="hidden sm:flex sm:w-[100px] sm:text-center sm:text-2xl">©2022</p>
    </footer>
  );
}
