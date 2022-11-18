import { useAppSelector } from 'app/hooks';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiGrid41, CiGrid2V } from 'react-icons/ci';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { BiEdit, BiTrash } from 'react-icons/bi';
// import { BiTask } from 'react-icons/bi';

const boardsDataArr = [
  { title: 'Board 1', description: 'description1', id: 'dsghjsghj1' },
  { title: 'Board 2', description: 'description2', id: 'jnkjlkcv2' },
  { title: 'Board 3', description: 'description3', id: 'dsghghj3' },
  { title: 'Board 4', description: 'description4', id: 'jnlkcv4' },
  { title: 'Board 5', description: 'description5', id: 'dsghjhqda5' },
  {
    title:
      'Cras dui nisl, dignissim nec tincidunt eget, varius non nisi. Aliquam libero nibh, condimentum ac erat sed, aliquam facilisis ex',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac viverra diam. Integer at mauris libero. Vestibulum elementum, velit a porttitor blandit, nisl lacus porttitor elit, eget placerat ante augue nec nulla.',
    id: 'dsghjhkhksghj6',
  },
  { title: 'Board 7', description: 'description7', id: 'jnkjlkcv7' },
];

export const Boards: FC = () => {
  const { lang } = useAppSelector((state) => state.langReducer);
  const [grid, setGrid] = useState('grid');

  const gridButtonStyle = grid == 'grid' ? 'rgb(59, 130, 246, 1)' : 'rgb(0, 0, 0, 0.5)';
  const listButtonStyle = grid == 'grid' ? 'rgb(0, 0, 0, 0.5)' : 'rgb(59, 130, 246, 1)';

  return (
    <>
      <section className="min-h-[calc(100vh-100px-80px)] bg-gray-50 ">
        <div className="flex h-[50px] w-full items-center justify-between px-[20px]  sm:h-[70px] sm:px-[200px]">
          <h2 className="text-2xl font-semibold text-gray-600 sm:text-3xl">
            {lang == 'en' ? 'Boards' : 'Доски'}
          </h2>
          {/* <div>(some filters)</div> */}
          <div className="flex gap-[5px]">
            <button className="hover:scale-105 active:scale-95" onClick={() => setGrid('grid')}>
              <CiGrid41 size={25} color={gridButtonStyle} />
            </button>
            <button
              className="rotate-90 hover:scale-105 active:scale-95"
              onClick={() => setGrid('list')}
            >
              <CiGrid2V size={25} color={listButtonStyle} />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-[30px] px-[20px] pb-[20px]">
          {boardsDataArr.map((item) => (
            <BoardsCard
              title={item.title}
              description={item.description}
              id={item.id}
              key={item.id}
            />
          ))}
        </div>
      </section>
    </>
  );
};

function BoardsCard(props: { title: string; description: string; id: string }) {
  const navigate = useNavigate();

  return (
    <article
      className="relative h-[200px] w-[300px] cursor-pointer rounded-lg bg-white p-[20px] text-center shadow"
      onClick={() => {
        const path = `board/${props.id}`;
        navigate(path);
      }}
    >
      <div className="flex items-center gap-[5px]">
        <HiOutlineClipboardList size={40} color="rgb(59, 130, 246, 1)" />
        <h3 className="max-w-[210px] truncate text-xl font-semibold text-gray-700">
          {props.title}
        </h3>
      </div>
      <button
        className="absolute top-[20px] right-[20px] hover:scale-105 active:scale-95"
        onClick={(e) => {
          e.stopPropagation();
          // delete card
        }}
      >
        <BiTrash size={20} color="rgb(107, 114, 128, 1)" />
      </button>
      <textarea
        className="text-md mt-[10px] h-[110px] w-full resize-none overflow-hidden rounded-md border border-slate-100 p-2 text-gray-500 focus:outline-none"
        value={props.description}
        readOnly
      />
    </article>
  );
}
