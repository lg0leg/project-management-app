import { apiToken } from 'API/API';
import type { AppDispatch } from 'app/store';
import { taskSlice } from '../slices/taskSlice';
import type { IUser } from 'models/typescript';
import type { ITask } from 'models/dbTypes';
import { handleError401 } from 'utils/handleErrors';
import type { navigateType } from 'models/typescript';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    taskSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};

interface ITaskData {
  title: string;
  order: number;
  description: string;
  userId: number;
  users: string[];
}
interface ITasksProps {
  columnId: string;
  boardId: string;
  navigate: navigateType;
}
interface ITasksStoreProps {
  columnsIdList: string[];
  boardId: string;
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

interface IBoardsByIdsListProps {
  navigate: navigateType;
  userId: string[];
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
        dispatch(
          fetchGetTasks({
            boardId,
            columnId,
            navigate,
          })
        );
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
        dispatch(
          fetchGetTasks({
            boardId,
            columnId,
            navigate,
          })
        );
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
        dispatch(fetchGetTasks({ navigate, boardId, columnId }));
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchGetTasksStore = ({ navigate, boardId, columnsIdList }: ITasksStoreProps) => {
  return async (dispatch: AppDispatch) => {
    setLoadingStatus(dispatch);
    try {
      Promise.all(
        columnsIdList.map((columnId) =>
          apiToken<ITask[]>(`/boards/${boardId}/columns/${columnId}/tasks`)
        )
      ).then((response) => {
        console.log(response);

        // dispatch(
        //   taskSlice.actions.getTasks({
        //     tasks: response[],
        //   })
        // );
      });
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};
