import { apiToken } from 'API/API';
import { AppDispatch } from 'app/store';
import type { navigateType, IWebSocket } from 'models/typescript';
import { IPoint, IBoard, ITask } from 'models/dbTypes';
import { handleError } from 'utils/handleErrors';
import { pointSlice } from 'app/slices/pointSlice';
import { fetchGetAllBoardStore } from './boardActionCreator';
import { getBoardText } from 'utils/getBoardText';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    pointSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};

const setCompleteStatus = (dispatch: AppDispatch) => {
  dispatch(
    pointSlice.actions.setStatus({
      isLoading: false,
      isError: false,
    })
  );
};

const setErrorStatus = (dispatch: AppDispatch) => {
  dispatch(
    pointSlice.actions.setStatus({
      isLoading: false,
      isError: true,
    })
  );
};
interface IPointParams {
  ids?: string;
  userId?: string;
}
interface IGetPointsProps extends IPointParams {
  navigate: navigateType;
}

interface IGetPointsByTaskIdProps {
  navigate: navigateType;
  taskId: string;
}
interface IGetPointsByTaskIdListProps {
  navigate: navigateType;
  taskIdList: string[];
}

interface IDeletePointProps {
  navigate: navigateType;
  pointId: string;
}

interface IPointData {
  taskId: string;
  boardId: string;
  title: string;
  done: boolean;
}

interface ICreatePointProps {
  navigate: navigateType;
  point: IPointData;
}

interface IChangePointData {
  done: boolean;
  title: string;
}

interface IChangePointProps {
  pointData: IChangePointData;
  pointId: string;
  navigate: navigateType;
}

interface IChangeDoneField {
  _id: string;
  done: boolean;
}
interface IChangeDoneFieldProps {
  navigate: navigateType;
  pointList: IChangeDoneField[];
  boardId?: string;
}

// получение всех файлов по параметрам:
export const fetchGetPointsByParams = ({ navigate, ids, userId }: IGetPointsProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const params: IPointParams = {};
      if (userId) params.userId = userId;
      if (ids && ids.length) params.ids = JSON.stringify(ids);
      const response = await apiToken<IPoint[]>(`/points`, { params });

      dispatch(
        pointSlice.actions.getPoints({
          points: response.data,
        })
      );
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchGetPointsByTaskId = ({ navigate, taskId }: IGetPointsByTaskIdProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const response = await apiToken<IPoint[]>(`/points/${taskId}`);

      dispatch(
        pointSlice.actions.getPoints({
          points: response.data,
        })
      );
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchDeletePoint = ({ navigate, pointId }: IDeletePointProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const response = await apiToken.delete<IPoint>(`/points/${pointId}`);

      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchGetAllBoardStore({ _id: response.data.boardId, navigate }));
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchCreatePoint = ({ navigate, point }: ICreatePointProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.post<IPoint>(`/points`, point);

      if (response.status >= 200 && response.status < 300) {
        setCompleteStatus(dispatch);
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchChangeDoneInPointList = ({
  navigate,
  pointList,
  boardId,
}: IChangeDoneFieldProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.patch<IPoint>(`/points`, pointList);

      if (response.status >= 200 && response.status < 300 && boardId) {
        dispatch(fetchGetAllBoardStore({ _id: boardId, navigate }));
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};
// изменено для WebSocket
export const fetchChangePoint = ({ navigate, pointData, pointId }: IChangePointProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.patch<IPoint>(`/points/${pointId}`, pointData);

      if (response.status >= 200 && response.status < 300) {
        setCompleteStatus(dispatch);
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchGetPointsByTaskIdList = ({
  navigate,
  taskIdList,
}: IGetPointsByTaskIdListProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      Promise.allSettled(
        taskIdList.map(async (taskId) => await apiToken<IPoint[]>(`/points/${taskId}`))
      ).then((response) => {
        const isFulfilled = <T>(
          input: PromiseSettledResult<T>
        ): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

        const allPoint: IPoint[] = [];
        response.filter(isFulfilled).forEach((points) => {
          allPoint.push(...points.value.data);
        });

        dispatch(
          pointSlice.actions.getPoints({
            points: allPoint,
          })
        );
      });
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const webSocketPoints = ({ navigate, data, showNotify }: IWebSocket) => {
  return async (dispatch: AppDispatch) => {
    const { action, ids, notify } = data;
    const { pathname } = window.location;
    try {
      if (!ids || !ids.length) return;
      if (action === 'add') {
        const params = { ids: JSON.stringify(ids) };
        const responsePoints = await apiToken<IPoint[]>(`/points`, {
          params,
        });
        const filteredPoints = responsePoints.data.filter(
          (point) => pathname === `/board/${point.boardId}`
        );
        dispatch(
          pointSlice.actions.addPoints({
            points: filteredPoints,
          })
        );
      }
      if (action === 'update') {
        const params = { ids: JSON.stringify(ids) };
        const responsePoints = await apiToken<IPoint[]>(`/points`, {
          params,
        });
        const filteredPoints = responsePoints.data.filter(
          (point) => pathname === `/board/${point.boardId}`
        );
        dispatch(
          pointSlice.actions.updatePoints({
            updatedPoints: filteredPoints,
          })
        );
      }
    } catch (e) {
      handleError(dispatch, e, navigate);
    }
  };
};
