import { apiToken } from 'API/API';
import { AppDispatch } from 'app/store';
import type { navigateType } from 'models/typescript';
import { IPoint } from 'models/dbTypes';
import { handleError401 } from 'utils/handleErrors';
import { pointSlice } from 'app/slices/pointSlice';
import { fetchGetAllBoardStore } from './boardActionCreator';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    pointSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};
interface IPointParams {
  ids?: string[];
  userId?: string;
}
interface IGetPointsProps extends IPointParams {
  navigate: navigateType;
}

interface IGetPointsByTaskIdProps {
  navigate: navigateType;
  taskId: string;
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
      if (ids && ids.length) params.ids = ids;
      const response = await apiToken<IPoint[]>(`/point`, { params });

      dispatch(
        pointSlice.actions.getPoints({
          points: response.data,
        })
      );
    } catch (e) {
      handleError401(dispatch, e, navigate);
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
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchDeletePoint = ({ navigate, pointId }: IDeletePointProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const response = await apiToken.delete<IPoint>(`/point/${pointId}`);

      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchGetAllBoardStore({ _id: response.data.boardId, navigate }));
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchCreatePoint = ({ navigate, point }: ICreatePointProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.post<IPoint>(`/point`, point);

      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchGetAllBoardStore({ _id: response.data.boardId, navigate }));
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
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

      const response = await apiToken.patch<IPoint>(`/point`, pointList);

      if (response.status >= 200 && response.status < 300 && boardId) {
        dispatch(fetchGetAllBoardStore({ _id: boardId, navigate }));
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchChangePoint = ({ navigate, pointData, pointId }: IChangePointProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.patch<IPoint>(`/point/${pointId}`, pointData);

      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchGetAllBoardStore({ _id: response.data.boardId, navigate }));
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};
