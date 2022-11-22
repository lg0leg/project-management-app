import { apiToken } from 'API/API';
import type { AppDispatch } from 'app/store';
import { columnSlice } from '../slices/columnSlice';
import type { IColumn, IUser } from 'models/dbTypes';
import { handleError401 } from 'utils/handleErrors';
import type { navigateType } from 'models/typescript';
import { fetchGetAllBoardStore } from './boardActionCreator';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    columnSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};

interface ISetColumnsProps {
  navigate: navigateType;
  newColumns: IColumn[];
}
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
interface IColumnsParams {
  userId?: string;
  ids?: string[];
}
interface IGetColumnsByParams extends IColumnsParams {
  navigate: navigateType;
}

interface ICreateColumnSetParams {
  order: number;
  _id: string;
  boardId: string;
}
interface ICreateColumnSetProps {
  navigate: navigateType;
  newColumns: ICreateColumnSetParams[];
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
        dispatch(fetchGetAllBoardStore({ _id: boardId, navigate }));
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
        dispatch(fetchGetAllBoardStore({ _id: boardId, navigate }));
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
        dispatch(fetchGetAllBoardStore({ _id: boardId, navigate }));
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchColumnsSet = ({ navigate, newColumns }: ISetColumnsProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        columnSlice.actions.getColumns({
          columns: newColumns,
        })
      );
      const setColumnsList = newColumns.map((item) => ({ order: item.order, _id: item._id }));

      setLoadingStatus(dispatch);

      const response = await apiToken.patch<IColumn[]>(`/columnsSet`, setColumnsList);

      if (response.status >= 200 && response.status < 300) {
        dispatch(
          columnSlice.actions.getColumns({
            columns: response.data,
          })
        );
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchCreateColumnsSet = ({ navigate, newColumns }: ICreateColumnSetProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.post<IColumn[]>(`/columnsSet`, newColumns);

      if (response.status >= 200 && response.status < 300) {
        dispatch(
          columnSlice.actions.getColumns({
            columns: response.data,
          })
        );
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchGetColumnsByParams = ({ navigate, userId, ids }: IGetColumnsByParams) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const params: IColumnsParams = {};
      if (userId) params.userId = userId;
      if (ids) params.ids = ids;
      const response = await apiToken<IColumn[]>(`/columnsSet`, { params });

      if (response.status >= 200 && response.status < 300) {
        dispatch(
          columnSlice.actions.getColumns({
            columns: response.data,
          })
        );
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};
