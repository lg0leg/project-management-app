import { FC, MouseEvent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from 'components/Column';
import { IBoard, IColumn, ITask, IUser } from 'models/dbTypes';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { MdAdd } from 'react-icons/md';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import Popup from 'components/popup/popup';
import { DeleteConformation } from 'components/DeleteConformation';
import AddModalContent from 'components/AddModalContent';
import { ModalTypes } from 'constants/modalTypes';
import { fetchGetAllBoardStore } from 'app/actionCreators/boardActionCreator';
import { isExpired } from 'react-jwt';
import { logout } from 'app/actionCreators/authActionCreators';
import Spinner from 'components/Spinner';
import { fetchGetUsers } from 'app/actionCreators/userActionCreator';
import { RoutesPath } from 'constants/routes';
import { fetchCreateColumn, fetchColumnsSet } from 'app/actionCreators/columnActionCreator';
import {
  fetchCreateTask,
  fetchDeleteTask,
  fetchTasksSet,
} from 'app/actionCreators/taskActionCreator';
import SimpleSpinner from 'components/spinners/SimpleSpinner';
import { getBoardText } from 'utils/getBoardText';

export const Board: FC = () => {
  const { id } = useParams();
  const { lang } = useAppSelector((state) => state.langReducer);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTargetId, setModalTargetId] = useState('');
  const [modalTargetType, setModalTargetType] = useState('');

  const _id = id ?? '';
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { board, isLoading: isLoadingBoards } = useAppSelector((state) => state.boardReducer);
  const { columns, isLoading: isLoadingColumns } = useAppSelector((state) => state.columnReducer);
  const { tasks, isLoading: isLoadingTasks } = useAppSelector((state) => state.taskReducer);
  const { users, isLoading: isLoadingUsers } = useAppSelector((state) => state.userReducer);
  const { token } = useAppSelector((state) => state.authReducer);
  const isLoading = isLoadingBoards || isLoadingColumns || isLoadingTasks || isLoadingUsers;
  const copyColumns = [...columns];
  // const { title } = getBoardText(board.title);

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

  const openModal = (
    event: MouseEvent<HTMLButtonElement>,
    modalType: string,
    modalTargetId?: string,
    modalTargetType?: string
  ) => {
    event.preventDefault();
    setModalType(modalType);
    setModalOpen(true);
    if (modalTargetId) setModalTargetId(modalTargetId);
    if (modalTargetType) setModalTargetType(modalTargetType);
  };

  const onConfirm = () => {
    if (ModalTypes.ADD === modalType) {
      console.log('create modal');
      console.log('modalType: ', modalType);
      console.log('modalTargetId: ', modalTargetId);
      console.log('modalTargetType: ', modalTargetType);

      if (modalTargetType === 'task') {
        // dispatch(fetchCreateTask({ boardId: _id, column }));
      }
      if (modalTargetType === 'column') {
      }
    }
    if (ModalTypes.EDIT === modalType) {
      console.log('edit modal');
      return;
    }
    if (ModalTypes.DELETE === modalType) {
      console.log('delete modal');
      console.log('modalType: ', modalType);
      console.log('modalTargetId: ', modalTargetId);
      console.log('modalTargetType: ', modalTargetType);

      if (modalTargetType === 'task') {
        const targetTask = tasks.filter((task) => task._id === modalTargetId)[0];
        dispatch(
          fetchDeleteTask({
            _id: modalTargetId,
            columnId: targetTask.columnId,
            boardId: targetTask.boardId,
            navigate,
          })
        );
      }
      if (modalTargetType === 'column') {
      }
      setModalType('');
      setModalTargetId('');
      setModalOpen(false);
    }
  };

  const onCancel = () => {
    setModalType('');
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

  return (
    <>
      {isLoading ? (
        <div className="flex h-[calc(100vh-100px-80px)] w-full items-center justify-center">
          <SimpleSpinner isLoading={isLoading} sizePx={180} color="blue" />
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex h-[calc(100vh-100px-80px)] flex-col items-center justify-center bg-gray-50">
            <h1 className="h-[60px] w-full px-5 pt-4 text-3xl font-semibold text-gray-900">
              {/* {title} */}
              title
            </h1>
            <Droppable droppableId={'board.' + id} type={'COLUMN'} direction={'horizontal'}>
              {(provided) => (
                <div
                  className="scrollbar flex h-full w-full items-stretch space-x-4 overflow-x-auto overflow-y-hidden p-4 text-gray-700"
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
                        />
                      );
                    })}
                  {provided.placeholder}
                  <div className="flex w-[22rem] min-w-[22rem] flex-shrink-0 touch-none flex-col rounded-lg bg-gray-50">
                    <button
                      className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-2 font-semibold text-gray-500 hover:bg-gray-100"
                      onClick={(e) => {
                        openModal(e, ModalTypes.ADD, '', 'column');
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
      )}
      <Popup popupVisible={modalOpen} setPopupVisible={setModalOpen}>
        {modalType === ModalTypes.ADD && (
          <AddModalContent type={modalTargetType} onConfirm={onConfirm} onCancel={onCancel} />
        )}
        {modalType === ModalTypes.EDIT}
        {modalType === ModalTypes.DELETE && (
          <DeleteConformation type={modalTargetType} onConfirm={onConfirm} onCancel={onCancel} />
        )}
      </Popup>
    </>
  );
};

export default Board;
