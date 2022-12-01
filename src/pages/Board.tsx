import { FC, MouseEvent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from 'components/Column';
import type { IColumn, ITask } from 'models/dbTypes';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { MdAdd } from 'react-icons/md';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import Popup from 'components/popup/popup';
import { DeleteConformation } from 'components/DeleteConformation';
import { ModalTypes } from 'constants/modalTypes';
import { fetchGetAllBoardStore } from 'app/actionCreators/boardActionCreator';
import { isExpired } from 'react-jwt';
import { logout } from 'app/actionCreators/authActionCreators';
import { fetchGetUsers } from 'app/actionCreators/userActionCreator';
import { fetchColumnsSet, fetchDeleteColumn } from 'app/actionCreators/columnActionCreator';
import { fetchDeleteTask, fetchTasksSet } from 'app/actionCreators/taskActionCreator';
import { getBoardText } from 'utils/getBoardText';
import { AddColumnModalContent } from 'components/modals/AddColumnModalContent';
import { AddTaskModalContent } from 'components/modals/AddTaskModalContent';
import SpinnerWithOverlay from 'components/spinners/SpinnerWithOverlay';
import { EditTaskModalContent } from 'components/modals/EditTaskModalContent';
import { Button } from 'components/Button';
import { RoutesPath } from 'constants/routes';
import { HighliteByPriority } from 'components/HighliteByPriority';

export interface IOpenModalProps {
  event: MouseEvent<HTMLButtonElement>;
  modalType: string;
  modalTargetId?: string;
  modalTargetType?: string;
}

export const Board: FC = () => {
  const { id } = useParams();
  const { lang } = useAppSelector((state) => state.langReducer);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTargetId, setModalTargetId] = useState('');
  const [modalTargetType, setModalTargetType] = useState('');

  const navigate = useAppNavigate();
  const _id = id ?? '';
  const dispatch = useAppDispatch();
  const { board, isLoading: isLoadingBoards } = useAppSelector((state) => state.boardReducer);
  const { columns, isLoading: isLoadingColumns } = useAppSelector((state) => state.columnReducer);
  const { tasks, isLoading: isLoadingTasks } = useAppSelector((state) => state.taskReducer);
  const { isLoading: isLoadingUsers } = useAppSelector((state) => state.userReducer);
  const { points, isLoading: isLoadingPoints } = useAppSelector((state) => state.pointReducer);
  const { token } = useAppSelector((state) => state.authReducer);
  const isLoading =
    isLoadingBoards || isLoadingColumns || isLoadingTasks || isLoadingUsers || isLoadingPoints;
  const copyColumns = [...columns];
  const currentTask = tasks.filter((t) => t._id === modalTargetId)[0];
  let boardTitle = '';
  if (board && board.title) {
    boardTitle = getBoardText(board.title).title;
  }

  useEffect(() => {
    if (isExpired(token)) {
      dispatch(logout(navigate));
    }
  });

  useEffect(() => {
    if (isExpired(token)) {
      dispatch(logout(navigate));
    } else {
      dispatch(fetchGetUsers(navigate));
      dispatch(fetchGetAllBoardStore({ _id, navigate }));
    }
  }, []);

  const openModal = ({ event, modalType, modalTargetId, modalTargetType }: IOpenModalProps) => {
    event.preventDefault();
    setModalType(modalType);
    setModalOpen(true);
    if (modalTargetId) setModalTargetId(modalTargetId);
    if (modalTargetType) setModalTargetType(modalTargetType);
  };

  const onConfirmDelete = () => {
    if (modalTargetType === 'task' || modalTargetType === 'задачу') {
      const targetTask = tasks.filter((task) => task._id === modalTargetId)[0];
      const newTasks = tasks
        .filter((task) => task._id !== modalTargetId)
        .map((task) => {
          if (task.order > targetTask.order) {
            return { ...task, order: task.order - 1 };
          }
          return { ...task };
        });
      dispatch(
        fetchDeleteTask({
          _id: modalTargetId,
          columnId: targetTask.columnId,
          boardId: targetTask.boardId,
          navigate,
        })
      );
      dispatch(fetchTasksSet({ navigate, newTasks }));
    }
    if (modalTargetType === 'column' || modalTargetType === 'колонку') {
      const targetCol = copyColumns.find((col) => col._id === modalTargetId);
      const newColumns = copyColumns
        .filter((col) => col._id !== modalTargetId)
        .map((col) => {
          if (col.order > targetCol!.order) {
            return { ...col, order: col.order - 1 };
          }
          return { ...col };
        });
      dispatch(fetchDeleteColumn({ columnId: modalTargetId, navigate, boardId: _id }));
      dispatch(fetchColumnsSet({ navigate, newColumns }));
    }
    onCancel();
  };

  const onCancel = () => {
    setModalType('');
    setModalTargetId('');
    setModalTargetType('');
    setModalOpen(false);
  };

  const onDragEnd = (dropResult: DropResult) => {
    const { source, destination, type, draggableId } = dropResult;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'TASK') {
      const newTasks: ITask[] = tasks.map((task) => {
        if (task._id !== draggableId) {
          if (source.droppableId === destination.droppableId) {
            if (
              source.index > destination.index &&
              task.order >= destination.index &&
              task.order <= source.index
            )
              return { ...task, order: task.order + 1 };
            if (
              source.index < destination.index &&
              task.order <= destination.index &&
              task.order >= source.index
            )
              return { ...task, order: task.order - 1 };
          }
          if (task.columnId === destination!.droppableId && task.order >= destination!.index)
            return { ...task, order: task.order + 1 };
          if (task.columnId === source!.droppableId && task.order > source!.index)
            return { ...task, order: task.order - 1 };
          return task;
        } else {
          return { ...task, columnId: destination!.droppableId, order: destination!.index };
        }
      });
      dispatch(fetchTasksSet({ newTasks, navigate }));
    }
    if (type === 'COLUMN') {
      const draggedColumnId = draggableId.split('.')[1];
      if (source.droppableId === destination.droppableId) {
        const newColumns: IColumn[] = copyColumns.map((column) => {
          if (column._id !== draggedColumnId) {
            if (
              source.index > destination.index &&
              column.order >= destination.index &&
              column.order <= source.index
            )
              return { ...column, order: column.order + 1 };
            if (
              source.index < destination.index &&
              column.order <= destination.index &&
              column.order >= source.index
            )
              return { ...column, order: column.order - 1 };
            return { ...column };
          } else {
            return { ...column, order: destination!.index };
          }
        });
        dispatch(fetchColumnsSet({ newColumns, navigate }));
      }
    }
  };

  const priority = ['none', 'low', 'medium', 'high', 'critical'];
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [checkedState, setCheckedState] = useState(new Array(priority.length).fill(false));
  const buildHash = (keys: string[], values: boolean[]) => {
    const map = new Map();
    for (let i = 0; i < keys.length; i++) {
      map.set(keys[i], values[i]);
    }
    return map;
  };
  const hashMap = buildHash(priority, checkedState);

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const [filterValue, setFilterValue] = useState('none');

  return (
    <>
      <SpinnerWithOverlay isLoading={isLoading} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex h-[calc(100vh-100px-80px)] flex-col items-center justify-center bg-gray-50">
          <div className="flex w-full flex-row items-center justify-between px-5 pt-3">
            <div className="flex max-h-[60px] max-w-[75%] flex-row items-center justify-start">
              <Button color="light" onClick={() => navigate(RoutesPath.BOARDS)}>
                {lang === LangKey.EN ? 'Back' : 'Назад'}
              </Button>
              <h1 className="ml-2 truncate text-3xl font-semibold text-gray-900">{boardTitle}</h1>
            </div>
            <div className="flex w-[25%] flex-row items-center justify-evenly pr-5">
              <HighliteByPriority
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                priority={priority}
                checkedState={checkedState}
                handleOnChange={handleOnChange}
              />
              <select
                id="priority"
                className="block w-fit rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="none">{lang === LangKey.EN ? 'None' : 'Нет фильтра'}</option>
                <option value="low">{lang === LangKey.EN ? 'Low' : 'Низкий'}</option>
                <option value="medium">{lang === LangKey.EN ? 'Medium' : 'Средний'}</option>
                <option value="high">{lang === LangKey.EN ? 'High' : 'Высокий'}</option>
                <option value="critical">{lang === LangKey.EN ? 'Critical' : 'Критический'}</option>
              </select>
            </div>
          </div>

          <Droppable droppableId={'board.' + id} type={'COLUMN'} direction={'horizontal'}>
            {(provided, snapshot) => (
              <div
                className={`scrollbar flex h-full w-full items-stretch space-x-4 overflow-x-auto overflow-y-hidden px-4 py-3 text-gray-700 `}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {copyColumns
                  .sort((col1, col2) => col1.order - col2.order)
                  .map((column, index) => {
                    return (
                      <Column
                        key={column._id}
                        index={index}
                        column={column}
                        tasks={tasks.filter((task) => task.columnId === column._id)}
                        openModal={openModal}
                        hashMap={hashMap}
                        filterValue={filterValue}
                      />
                    );
                  })}
                {provided.placeholder}
                <div className="flex w-[22rem] min-w-[22rem] flex-shrink-0 touch-none flex-col rounded-lg bg-gray-50">
                  <button
                    className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-2 font-semibold text-gray-500 hover:bg-gray-100"
                    onClick={(event) => {
                      openModal({ event, modalType: ModalTypes.ADD, modalTargetType: 'column' });
                    }}
                  >
                    <MdAdd />
                    {lang === LangKey.EN ? 'Add new column' : 'Добавить колонку'}
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <Popup popupVisible={modalOpen} setPopupVisible={setModalOpen}>
        {modalType === ModalTypes.ADD &&
          (modalTargetType === 'column' ? (
            <AddColumnModalContent onCancel={onCancel} />
          ) : (
            <AddTaskModalContent columnId={modalTargetId} onCancel={onCancel} />
          ))}
        {modalType === ModalTypes.EDIT && (
          <EditTaskModalContent task={currentTask} priority={points} onCancel={onCancel} />
        )}
        {modalType === ModalTypes.DELETE && (
          <DeleteConformation
            type={modalTargetType}
            onConfirm={onConfirmDelete}
            onCancel={onCancel}
          />
        )}
      </Popup>
    </>
  );
};

export default Board;
