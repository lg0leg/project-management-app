import { FC, KeyboardEvent, useState } from 'react';
import type { IColumn, ITask } from 'models/dbTypes';
import { MdAdd, MdDone } from 'react-icons/md';
import { Task } from './Task';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { BiTrash } from 'react-icons/bi';
import { LangKey } from 'constants/lang';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { ModalTypes } from 'constants/modalTypes';
import { fetchUpdateColumn } from 'app/actionCreators/columnActionCreator';
import { HiXMark } from 'react-icons/hi2';
import type { IOpenModalProps } from 'pages/Board';

interface IColumnProps {
  index: number;
  column: IColumn;
  tasks: ITask[];
  openModal: ({ event, modalType, modalTargetId, modalTargetType }: IOpenModalProps) => void;
  hashMap: Map<string, boolean>;
  filterValue: string;
}

export const Column: FC<IColumnProps> = ({
  column,
  tasks,
  index,
  openModal,
  hashMap,
  filterValue,
}: IColumnProps) => {
  const { lang } = useAppSelector((state) => state.langReducer);
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const { points } = useAppSelector((state) => state.pointReducer);
  const [isChanging, setIsChanging] = useState(false);
  const [title, setTitle] = useState(column.title);

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      changeColumnTitle();
      setIsChanging((prev) => !prev);
    }
  };
  const onDoneButtonPressed = () => {
    changeColumnTitle();
    setIsChanging((prev) => !prev);
  };
  const changeColumnTitle = () => {
    const newCol = {
      _id: column._id,
      boardId: column.boardId,
      order: column.order,
      title,
    };
    dispatch(fetchUpdateColumn({ column: newCol, navigate }));
  };

  return (
    <Draggable draggableId={'drag.' + column._id} index={index} isDragDisabled={isChanging}>
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
                  <button
                    type="button"
                    className=" rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200"
                    onClick={onDoneButtonPressed}
                  >
                    <MdDone className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    className=" rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200"
                    onClick={() => setIsChanging((prev) => !prev)}
                  >
                    <div className="h-5 w-5">
                      <HiXMark size={20} />
                    </div>
                    <span className="sr-only">{lang === LangKey.EN ? 'Close' : 'Закрыть'}</span>
                  </button>
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
                    onClick={(event) => {
                      openModal({
                        event,
                        modalType: ModalTypes.DELETE,
                        modalTargetId: column._id,
                        modalTargetType: lang === LangKey.EN ? 'column' : 'колонку',
                      });
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
                  .filter((task) => {
                    if (filterValue === 'none') return task;
                    return (
                      task._id ===
                      points
                        .filter((p) => p.title === filterValue)
                        .find((p) => p.taskId === task._id)?.taskId
                    );
                  })
                  .map((task, index) => {
                    return (
                      <Task
                        key={task._id}
                        task={task}
                        index={index}
                        openModal={openModal}
                        hashMap={hashMap}
                      />
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="p-2">
            <button
              className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-2 font-semibold text-gray-500 hover:bg-gray-100"
              onClick={(event) => {
                openModal({
                  event,
                  modalType: ModalTypes.ADD,
                  modalTargetId: column._id,
                  modalTargetType: 'task',
                });
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
