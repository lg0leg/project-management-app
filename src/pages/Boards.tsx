import { useAppSelector } from 'app/hooks';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const boardsDataArr = [
  { title: 'board1', description: 'description1', id: 'dsghjsghj1' },
  { title: 'board2', description: 'description2', id: 'jnkjlkcv2' },
  { title: 'board3', description: 'description3', id: 'dsghghj3' },
  { title: 'board4', description: 'description4', id: 'jnlkcv4' },
  { title: 'board5', description: 'description5', id: 'dsghjhqda5' },
  { title: 'board6', description: 'description6', id: 'jnkjlkcv6' },
  { title: 'board7', description: 'description7', id: 'dsghjhkhksghj7' },
];

export const Boards: FC = () => {
  const { lang } = useAppSelector((state) => state.langReducer);

  return (
    <>
      <section className="min-h-[calc(100vh-100px-80px)] bg-gray-50 ">
        <div className="flex h-[50px] w-full items-center justify-between px-[20px]  sm:h-[70px] sm:px-[100px]">
          <h2 className="text-2xl font-semibold text-blue-500 sm:text-3xl">
            {lang == 'en' ? 'Boards' : 'Доски'}
          </h2>
          <div>(some filters)</div>
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
      className="h-[200px] min-w-[300px] cursor-pointer rounded-lg bg-white shadow"
      onClick={() => {
        const path = `board/${props.id}`;
        navigate(path);
      }}
    >
      Card
    </article>
  );
}
