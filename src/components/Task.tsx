import React, { FC, useState } from 'react';
import NotFoundImage from '../assets/images/NotFound.jpg';
import { BiEdit } from 'react-icons/bi';
import { IFile, ITask, IUser } from 'models/dbTypes';

const usersListmocks: IUser[] = [
  {
    _id: 'User1',
    name: 'User1',
    login: 'User1',
  },
  {
    _id: 'User2',
    name: 'User2',
    login: 'User2',
  },
];

const filesListMocks: IFile[] = [
  {
    _id: 'File id',
    name: 'example.img',
    taskId: 'Task id2',
    boardId: 'id of board',
    path: NotFoundImage,
  },
];

interface ITaskProps {
  task: ITask;
}

export const Task: FC<ITaskProps> = ({ task }: ITaskProps) => {
  const [lang, setLang] = useState('en');
  return (
    <div className="mb-4 flex max-w-[28rem] cursor-move flex-col rounded-lg bg-white p-5 shadow last:mb-0">
      <div className="flex items-center justify-between pb-4">
        <div className="text-base font-semibold text-gray-900">{task.title}</div>
        <button
          className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200"
          onClick={() => {}}
        >
          <BiEdit className="h-5 w-5" />
        </button>
      </div>
      {filesListMocks[0].taskId === task._id ? (
        <div className="flex items-center justify-center pb-4">
          {/* <img className="rounded-lg bg-contain" src={NotFoundImage} alt="img" /> */}
          <img
            className="rounded-lg bg-contain"
            src={filesListMocks[0].path}
            alt={filesListMocks[0].name}
          />
        </div>
      ) : null}
      <div className="flex flex-col ">
        <div className="pb-4 text-sm font-normal text-gray-700">{task.description}</div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default Task;
