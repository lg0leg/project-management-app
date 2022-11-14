import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from 'components/Column';
import { IColumn } from 'models/dbTypes';

const columnListMocks: IColumn[] = [
  {
    _id: 'Column id1',
    title: 'Column one',
    order: 1,
    boardId: 'Id of boards',
  },
  {
    _id: 'Column id2',
    title: 'Column two',
    order: 3,
    boardId: 'Id of boards',
  },
  {
    _id: 'Column id3',
    title: 'Column three',
    order: 2,
    boardId: 'nope',
  },
];

export const Board: FC = () => {
  const { id } = useParams();
  return (
    <div className="h-scrollbar flex h-screen max-h-[calc(100vh-100px-80px)] w-screen space-x-4 overflow-auto bg-gray-50 p-8 text-gray-700">
      {columnListMocks
        .sort((col1, col2) => col1.order - col2.order)
        .map((column) => {
          return <Column key={column._id} column={column} />;
        })}
      {/* <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column /> */}
    </div>
  );
};

export default Board;
