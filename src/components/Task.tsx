import React, { FC, useState } from 'react';
import NotFoundImage from '../assets/images/NotFound.jpg';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { IFile, ITask, IUser } from 'models/dbTypes';
import { Draggable } from 'react-beautiful-dnd';

const filesListMocks: IFile[] = [
  {
    _id: 'File id',
    name: 'example.img',
    taskId: 'E6D624FD-0159-0C1E-AC4A-4A54438634CB',
    boardId: 'id of board',
    path: NotFoundImage,
  },
];

interface ITaskProps {
  task: ITask;
  index: number;
}

export const Task: FC<ITaskProps> = ({ task, index }: ITaskProps) => {
  const [lang, setLang] = useState('en');
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className="mb-4 flex max-w-[21rem] cursor-move flex-col rounded-lg bg-white p-5 shadow last:mb-0"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex items-center justify-between pb-4">
            <h3 className="truncate text-base font-semibold text-gray-900">{task.title}</h3>
            <div className="ml-2 flex flex-row">
              <button
                className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200"
                onClick={() => {}}
              >
                <BiEdit className="h-5 w-5" />
              </button>
              <button
                className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200"
                onClick={() => {}}
              >
                <BiTrash className="h-5 w-5" />
              </button>
            </div>
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
      )}
    </Draggable>
  );
};
export default Task;
