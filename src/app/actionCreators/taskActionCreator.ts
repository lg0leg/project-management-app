import { apiToken } from 'API/API';
import type { AppDispatch } from 'app/store';
import { taskSlice } from '../slices/taskSlice';
import type { ITask, IUser } from 'models/dbTypes';
import { handleError401 } from 'utils/handleErrors';
import type { navigateType } from 'models/typescript';
import { fetchGetAllBoardStore } from './boardActionCreator';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    taskSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};
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
  ids?: string[];
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

interface IUpdateColumnProps extends ICreateTaskProps {
  _id: string;
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
      handleError401(dispatch, e, navigate);
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
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchCreateTask = ({ boardId, columnId, task, navigate }: ICreateTaskProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.post<ITask>(
        `/boards/${boardId}/columns/${columnId}/tasks/`,
        task
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchGetAllBoardStore({ _id: boardId, navigate }));
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchUpdateTask = ({ boardId, columnId, _id, task, navigate }: IUpdateColumnProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.put<ITask>(
        `/boards/${boardId}/columns/${columnId}/tasks/${_id}`,
        task
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchGetAllBoardStore({ _id: boardId, navigate }));
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchDeleteTask = ({ columnId, navigate, boardId, _id }: ITaskProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.delete<IUser>(
        `/boards/${boardId}/columns/${columnId}/tasks/${_id}`
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchGetAllBoardStore({ _id: boardId, navigate }));
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
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
    } catch (e) {
      handleError401(dispatch, e, navigate);
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
      handleError401(dispatch, e, navigate);
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
      if (ids && ids.length) params.ids = ids;
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
      handleError401(dispatch, e, navigate);
    }
  };
};
