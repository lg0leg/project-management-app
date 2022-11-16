import React, { FC, useState } from 'react';
import { IColumn, ITask } from 'models/dbTypes';
import { MdAdd } from 'react-icons/md';
import { Task } from './Task';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BiEdit, BiTrash } from 'react-icons/bi';

interface IColumnProps {
  index: number;
  column: IColumn;
  tasks: ITask[];
}

export const Column: FC<IColumnProps> = ({ column, tasks, index }: IColumnProps) => {
  const [lang, setLang] = useState('en');

  return (
    <Draggable draggableId={'drag.' + column._id} index={index}>
      {(provided) => (
        <div
          className="flex w-[22rem] min-w-[22rem] flex-shrink-0 touch-none flex-col rounded-lg bg-gray-50"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex items-center justify-between p-2">
            <h2 className="truncate text-lg font-semibold text-gray-900 ">
              {column.title}{' '}
              <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800">
                {tasks.length}
              </span>
            </h2>
            <div className="flex flex-row">
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
          <Droppable droppableId={column._id} type="TASK">
            {(provided) => (
              <div
                className="scrollbar flex w-full flex-col overflow-x-hidden p-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks
                  .sort((t1, t2) => t1.order - t2.order)
                  .map((task, index) => {
                    return <Task key={task._id} task={task} index={index} />;
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="p-2">
            <button
              className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-2 font-semibold text-gray-500"
              onClick={() => {}}
            >
              <MdAdd />
              {lang === 'en' ? 'Add new card' : 'Добавить карточку'}
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
