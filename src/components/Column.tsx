import { useDrag } from '@use-gesture/react';
import { IColumn, ITask } from 'models/dbTypes';
import React, { FC, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Task } from './Task';

const tasksListMocks: ITask[] = [
  {
    _id: 'Task id',
    title: 'Task title1',
    order: 1,
    boardId: 'id of board',
    columnId: 'Column id1',
    description: 'Task decription1',
    userId: 'User1',
    users: ['User1'],
  },
  {
    _id: 'Task id2',
    title: 'Task title2',
    order: 0,
    boardId: 'id of board',
    columnId: 'Column id1',
    description: 'Task decription2',
    userId: 'User2',
    users: ['User2'],
  },
  {
    _id: 'Task id3',
    title: 'Task title3',
    order: 0,
    boardId: 'id of board',
    columnId: 'Column id2',
    description: 'Task decription3',
    userId: 'User1',
    users: ['User2'],
  },
  {
    _id: 'Task id4',
    title: 'Task title4',
    order: 0,
    boardId: 'id of board',
    columnId: 'Column id3',
    description: 'Task decription4',
    userId: 'User2',
    users: ['User1', 'User2'],
  },
];

interface IColumnProps {
  column: IColumn;
}

export const Column: FC<IColumnProps> = ({ column }: IColumnProps) => {
  const [lang, setLang] = useState('en');

  return (
    <div className="flex w-[20rem] min-w-[20rem] flex-shrink-0 flex-col rounded-lg bg-gray-50">
      <div className="px-2 pb-2">
        <h2 className="text-base font-semibold text-gray-900">{column.title}</h2>
      </div>
      <div className="v-scrollbar flex flex-col overflow-auto p-2">
        {tasksListMocks
          .sort((t1, t2) => t1.order - t2.order)
          .filter((task) => task.columnId === column._id)
          .map((task) => {
            return <Task key={task._id} task={task} />;
          })}
      </div>
      <div className="px-2 pt-2">
        <button
          className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-2 font-semibold text-gray-500"
          onClick={() => {}}
        >
          <MdAdd />
          {lang === 'en' ? 'Add new card' : 'Добавить карточку'}
        </button>
      </div>
    </div>
  );
};

export default Column;
