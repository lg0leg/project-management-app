import { apiToken } from 'API/API';
import type { AppDispatch } from 'app/store';
import { taskSlice } from '../slices/taskSlice';
import type { ITask, IUser, IBoard } from 'models/dbTypes';
import { handleError } from 'utils/handleErrors';
import type { navigateType, IWebSocket } from 'models/typescript';
import { fetchCreatePoint, fetchGetPointsByTaskIdList } from './pointActionCreator';
import { getBoardText } from 'utils/getBoardText';
import { NotifyTipe } from 'constants/notifyType';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    taskSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};

const setCompleteStatus = (dispatch: AppDispatch) => {
  dispatch(
    taskSlice.actions.setStatus({
      isLoading: false,
      isError: false,
    })
  );
};

const setErrorStatus = (dispatch: AppDispatch) => {
  dispatch(
    taskSlice.actions.setStatus({
      isLoading: false,
      isError: true,
    })
  );
};

interface IPointData {
  title: string;
  done: boolean;
}
interface ISetTasksProps {
  newTasks: ITask[];
  navigate: navigateType;
}
interface ITaskData {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}
interface IUpdateTaskData {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
  columnId: string;
}
interface ITasksProps {
  columnId: string;
  boardId: string;
  navigate: navigateType;
}
interface ITasksInBoardProps {
  boardId: string;
  navigate: navigateType;
}
interface ITasksParams {
  ids?: string;
  search?: string;
  userId?: string;
}
interface IGetTasksByParams extends ITasksParams {
  navigate: navigateType;
}

interface ITaskProps extends ITasksProps {
  _id: string;
}
interface ICreateTaskProps extends ITasksProps {
  task: ITaskData;
}

interface IUpdateTaskProps {
  _id: string;
  updateTask: IUpdateTaskData;
  columnId: string;
  boardId: string;
  navigate: navigateType;
}

interface ICreateTaskWithPointProps extends ICreateTaskProps {
  pointData: IPointData;
}

interface IDeleteTaskProps {
  board: IBoard;
  columnId: string;
  task: ITask;
  navigate: navigateType;
}

export const fetchGetTasks = ({ navigate, boardId, columnId }: ITasksProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const response = await apiToken<ITask[]>(`/boards/${boardId}/columns/${columnId}/tasks`);

      dispatch(
        taskSlice.actions.getTasks({
          tasks: response.data,
        })
      );
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchGetTask = ({ boardId, columnId, _id, navigate }: ITaskProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken<ITask>(`/boards/${boardId}/columns/${columnId}/tasks/${_id}`);

      dispatch(
        taskSlice.actions.getTask({
          task: response.data,
        })
      );
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

// изменено под webSocket
export const fetchCreateTask = ({ boardId, columnId, task, navigate }: ICreateTaskProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.post<ITask>(
        `/boards/${boardId}/columns/${columnId}/tasks/`,
        task
      );

      if (response.status >= 200 && response.status < 300) {
        setCompleteStatus(dispatch);
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

// изменено под webSocket
export const fetchUpdateTask = ({
  boardId,
  columnId,
  _id,
  updateTask,
  navigate,
}: IUpdateTaskProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.put<ITask>(
        `/boards/${boardId}/columns/${columnId}/tasks/${_id}`,
        updateTask
      );

      if (response.status >= 200 && response.status < 300) {
        setCompleteStatus(dispatch);
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};
// изменено под webSocket
export const fetchDeleteTask = ({ columnId, navigate, board, task }: IDeleteTaskProps) => {
  return async (dispatch: AppDispatch) => {
    const { title: taskName, _id: taskId } = task;
    const { title: boardName, _id: boardId } = board;
    try {
      setLoadingStatus(dispatch);
      const config = {
        headers: {
          guid: JSON.stringify({
            taskName: taskName,
            boardName: boardName,
            time: Date.now(),
          }),
        },
      };
      const response = await apiToken.delete<IUser>(
        `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        config
      );

      if (response.status >= 200 && response.status < 300) {
        setCompleteStatus(dispatch);
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchGetTasksInBoard = ({ navigate, boardId }: ITasksInBoardProps) => {
  return async (dispatch: AppDispatch) => {
    setLoadingStatus(dispatch);
    try {
      const response = await apiToken<ITask[]>(`/tasksSet/${boardId}`);
      dispatch(
        taskSlice.actions.getTasks({
          tasks: response.data,
        })
      );

      if (response.status >= 200 && response.status < 300) {
        const taskIdList = response.data.map((task) => task._id);
        dispatch(fetchGetPointsByTaskIdList({ taskIdList, navigate }));
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchTasksSet = ({ navigate, newTasks }: ISetTasksProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        taskSlice.actions.getTasks({
          tasks: newTasks,
        })
      );
      const setTasksList = newTasks.map((item) => ({
        order: item.order,
        _id: item._id,
        columnId: item.columnId,
      }));

      setLoadingStatus(dispatch);

      const response = await apiToken.patch<ITask[]>(`/tasksSet`, setTasksList);

      if (response.status >= 200 && response.status < 300) {
        dispatch(
          taskSlice.actions.getTasks({
            tasks: response.data,
          })
        );
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchGetTasksByParams = ({ navigate, userId, search, ids }: IGetTasksByParams) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const params: ITasksParams = {};
      if (userId) params.userId = userId;
      if (search) params.search = search;
      if (ids && ids.length) params.ids = JSON.stringify(ids);
      const response = await apiToken<ITask[]>(`/tasksSet`, {
        params,
      });

      if (response.status >= 200 && response.status < 300) {
        dispatch(
          taskSlice.actions.getTasks({
            tasks: response.data,
          })
        );
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};
// изменено под webSocket
export const fetchCreateTaskWithPoint = ({
  boardId,
  columnId,
  task,
  pointData,
  navigate,
}: ICreateTaskWithPointProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.post<ITask>(
        `/boards/${boardId}/columns/${columnId}/tasks/`,
        task
      );

      if (response.status >= 200 && response.status < 300) {
        const { title, done } = pointData;
        const point = { boardId, taskId: response.data._id, title, done };
        dispatch(fetchCreatePoint({ point, navigate }));
        setCompleteStatus(dispatch);
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const webSocketTasks = ({ navigate, data, showNotify }: IWebSocket) => {
  return async (dispatch: AppDispatch) => {
    const { action, ids, notify, guid } = data;
    const { pathname } = window.location;
    try {
      if (!ids || !ids.length) return;
      if (action === 'add') {
        const params = { ids: JSON.stringify(ids) };
        const responseTasks = await apiToken<ITask[]>(`/tasksSet`, {
          params,
        });
        if (notify) {
          responseTasks.data.forEach(async (task) => {
            const responseBoard = await apiToken<IBoard>(`/boards/${task.boardId}`);
            const { title: boardTitle } = getBoardText(responseBoard.data.title);
            showNotify({ type: NotifyTipe.ADD_TASK, task: task.title, board: boardTitle });
          });
        }

        const filteredTasks = responseTasks.data.filter(
          (task) => pathname === `/board/${task.boardId}`
        );
        dispatch(
          taskSlice.actions.addTasks({
            tasks: filteredTasks,
          })
        );
      }
      if (action === 'update') {
        const params = { ids: JSON.stringify(ids) };
        const responseTasks = await apiToken<ITask[]>(`/tasksSet`, {
          params,
        });
        if (notify) {
          responseTasks.data.forEach(async (task) => {
            const responseBoard = await apiToken<IBoard>(`/boards/${task.boardId}`);
            const { title: boardTitle } = getBoardText(responseBoard.data.title);
            showNotify({ type: NotifyTipe.UPDATE_TASK, task: task.title, board: boardTitle });
          });
        }

        const filteredTasks = responseTasks.data.filter(
          (task) => pathname === `/board/${task.boardId}`
        );
        dispatch(
          taskSlice.actions.updateTasks({
            updatedTasks: filteredTasks,
          })
        );
      }
      if (action === 'delete') {
        dispatch(
          taskSlice.actions.deleteTasks({
            deletedIds: ids,
          })
        );
        if (notify) {
          const { boardName, taskName } = JSON.parse(guid);
          const { title: boardTitle } = getBoardText(boardName);
          showNotify({
            type: NotifyTipe.DELETE_TASK,
            board: boardTitle,
            task: taskName,
          });
        }
      }
    } catch (e) {
      handleError(dispatch, e, navigate);
    }
  };
};

// export const fetchCreateTaskWithImg = ({
//   boardId,
//   columnId,
//   task,
//   file,
//   navigate,
// }: ICreateTaskWithImgProps) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       setLoadingStatus(dispatch);

//       const response = await apiToken.post<ITask>(
//         `/boards/${boardId}/columns/${columnId}/tasks/`,
//         task
//       );

//       if (response.status >= 200 && response.status < 300) {
//         dispatch(fetchAddFile({ boardId, taskId: response.data._id, file, navigate }));
//       }
//     } catch (e) {
//       setErrorStatus(dispatch);
//       handleError(dispatch, e, navigate);
//     }
//   };
// };
