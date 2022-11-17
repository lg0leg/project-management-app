import { apiToken } from 'API/API';
import type { AppDispatch } from 'app/store';
import { columnSlice } from '../slices/columnSlice';
import type { IUser } from 'models/typescript';
import type { IColumn } from 'models/dbTypes';
import { handleError401 } from 'utils/handleErrors';
import type { navigateType } from 'models/typescript';
import { fetchGetTasksStore } from './taskActionCreator';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    columnSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};
interface IColumnsProps {
  boardId: string;
  navigate: navigateType;
}

interface IColumnProps extends IColumnsProps {
  columnId: string;
}

interface ICreateColumnProps extends IColumnsProps {
  title: string;
  order: number;
}

interface IUpdateColumnProps {
  column: IColumn;
  navigate: navigateType;
}

export const fetchGetColumns = ({ navigate, boardId }: IColumnsProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const response = await apiToken<IColumn[]>(`/boards/${boardId}/columns`);

      dispatch(
        columnSlice.actions.getColumns({
          columns: response.data,
        })
      );
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchGetColumn = ({ boardId, columnId, navigate }: IColumnProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken<IColumn>(`/boards/${boardId}/columns/${columnId}`);

      dispatch(
        columnSlice.actions.getColumn({
          column: response.data,
        })
      );
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchCreateColumn = ({ boardId, title, order, navigate }: ICreateColumnProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.post<IColumn>(`/boards/${boardId}/columns/`, {
        title,
        order,
      });

      if (response.status >= 200 && response.status < 300) {
        dispatch(
          fetchGetColumns({
            boardId,
            navigate,
          })
        );
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchUpdateColumn = ({ column, navigate }: IUpdateColumnProps) => {
  const { _id: columnId, boardId, title, order } = column;
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.put<IColumn>(`/boards/${boardId}/columns/${columnId}`, {
        title,
        order,
      });

      if (response.status >= 200 && response.status < 300) {
        dispatch(
          fetchGetColumns({
            boardId,
            navigate,
          })
        );
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchDeleteColumn = ({ columnId, navigate, boardId }: IColumnProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.delete<IUser>(`/boards/${boardId}/columns${columnId}`);

      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchGetColumns({ navigate, boardId }));
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchGetColumnsStore = ({ navigate, boardId }: IColumnsProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const response = await apiToken<IColumn[]>(`/boards/${boardId}/columns`);

      dispatch(
        columnSlice.actions.getColumns({
          columns: response.data,
        })
      );
      const columnsIdList = response.data.map((item) => item._id);
      dispatch(fetchGetTasksStore({ boardId, columnsIdList, navigate }));
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};
