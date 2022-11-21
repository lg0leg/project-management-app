import { FC, KeyboardEvent, MouseEvent, useState } from 'react';
import { IColumn, ITask } from 'models/dbTypes';
import { MdAdd, MdDone } from 'react-icons/md';
import { Task } from './Task';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { BiTrash } from 'react-icons/bi';
import { LangKey } from 'constants/lang';
import { useAppSelector } from 'app/hooks';
import { ModalTypes } from 'constants/modalTypes';

interface IColumnProps {
  index: number;
  column: IColumn;
  tasks: ITask[];
  openModal: (
    event: MouseEvent<HTMLButtonElement>,
    modalType: string,
    modalTargetId?: string,
    modalTargetType?: string
  ) => void;
}

export const Column: FC<IColumnProps> = ({ column, tasks, index, openModal }: IColumnProps) => {
  const { lang } = useAppSelector((state) => state.langReducer);
  const [isChanging, setIsChanging] = useState(false);
  const [title, setTitle] = useState(column.title);

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('do validate');
      setIsChanging((prev) => !prev);
    }
  };
  const onDoneButtonPressed = () => {
    setIsChanging((prev) => !prev);
  };

  return (
    <Draggable draggableId={'drag.' + column._id} index={index}>
      {(provided) => (
        <div
          className="flex h-auto w-[22rem] min-w-[22rem] flex-shrink-0 touch-none flex-col rounded-lg bg-gray-50"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="flex items-center justify-between p-2" {...provided.dragHandleProps}>
            {isChanging ? (
              <>
                <div
                  className="fixed inset-0 z-30 cursor-default"
                  onClick={() => setIsChanging((prev) => !prev)}
                ></div>
                <div className="z-40 flex w-full flex-row items-center">
                  <input
                    className="mr-2 w-full cursor-text rounded-lg border border-gray-300 bg-gray-50 px-2 text-lg font-semibold text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    autoFocus
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      onKeyDownHandler(e);
                    }}
                  />
                  <div
                    className=" rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200"
                    onClick={onDoneButtonPressed}
                  >
                    <MdDone className="h-5 w-5" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2
                  className="cursor-pointer truncate px-2 text-lg font-semibold text-gray-900"
                  onClick={() => setIsChanging((prev) => !prev)}
                >
                  {column.title}{' '}
                  <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800">
                    {tasks.length}
                  </span>
                </h2>
                <div className="flex flex-row">
                  <button
                    className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200"
                    data-modal="modal-delete-column"
                    onClick={(e) => {
                      openModal(e, ModalTypes.DELETE, column._id, 'column');
                    }}
                  >
                    <BiTrash className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </div>
          <Droppable droppableId={column._id} type="TASK">
            {(provided) => (
              <div
                className="scrollbar flex h-auto min-h-[2.5rem] w-full flex-col overflow-x-hidden p-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks
                  .sort((t1, t2) => t1.order - t2.order)
                  .map((task, index) => {
                    return <Task key={task._id} task={task} index={index} openModal={openModal} />;
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="p-2">
            <button
              className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-2 font-semibold text-gray-500 hover:bg-gray-100"
              onClick={(e) => {
                openModal(e, ModalTypes.ADD, column._id, 'task');
              }}
            >
              <MdAdd />
              {lang === LangKey.EN ? 'Add new card' : 'Добавить карточку'}
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
