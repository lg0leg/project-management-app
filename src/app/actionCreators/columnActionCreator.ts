import { apiToken } from 'API/API';
import type { AppDispatch } from 'app/store';
import { columnSlice } from '../slices/columnSlice';
import type { IColumn, IUser, IBoard } from 'models/dbTypes';
import { handleError } from 'utils/handleErrors';
import type { navigateType, IWebSocket } from 'models/typescript';
import { getBoardText } from 'utils/getBoardText';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    columnSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};

const setCompleteStatus = (dispatch: AppDispatch) => {
  dispatch(
    columnSlice.actions.setStatus({
      isLoading: false,
      isError: false,
    })
  );
};

const setErrorStatus = (dispatch: AppDispatch) => {
  dispatch(
    columnSlice.actions.setStatus({
      isLoading: false,
      isError: true,
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
  ids?: string;
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
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
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
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

// переделано под webSocket
export const fetchCreateColumn = ({ boardId, title, order, navigate }: ICreateColumnProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.post<IColumn>(`/boards/${boardId}/columns/`, {
        title,
        order,
      });

      if (response.status >= 200 && response.status < 300) {
        setCompleteStatus(dispatch);
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};
// перделано под webSocket
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
        setCompleteStatus(dispatch);
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};
// перделано под webSocket
export const fetchDeleteColumn = ({ columnId, navigate, boardId }: IColumnProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.delete<IUser>(`/boards/${boardId}/columns/${columnId}`);

      if (response.status >= 200 && response.status < 300) {
        setCompleteStatus(dispatch);
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
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
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
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
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchGetColumnsByParams = ({ navigate, userId, ids }: IGetColumnsByParams) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const params: IColumnsParams = {};
      if (userId) params.userId = userId;
      if (ids) params.ids = JSON.stringify(ids);
      const response = await apiToken<IColumn[]>(`/columnsSet`, { params });

      if (response.status >= 200 && response.status < 300) {
        dispatch(
          columnSlice.actions.getColumns({
            columns: response.data,
          })
        );
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const webSocketColumns = ({ navigate, data, showNotify }: IWebSocket) => {
  return async (dispatch: AppDispatch) => {
    const { action, ids, notify } = data;
    const { pathname } = window.location;
    try {
      if (!ids || !ids.length) return;
      if (action === 'add') {
        const params = { ids: JSON.stringify(ids) };
        const responseColumns = await apiToken<IColumn[]>(`/columnsSet`, {
          params,
        });

        if (notify) {
          responseColumns.data.forEach(async (column) => {
            const responseBoard = await apiToken<IBoard>(`/boards/${column.boardId}`);
            const { title: boardTitle } = getBoardText(responseBoard.data.title);
            showNotify(`Добавлена колонка ${column.title} в доске ${boardTitle}`);
          });
        }

        const filteredColumns = responseColumns.data.filter(
          (column) => pathname === `/board/${column.boardId}`
        );
        dispatch(
          columnSlice.actions.addColumns({
            columns: filteredColumns,
          })
        );
      }
      if (action === 'update') {
        const params = { ids: JSON.stringify(ids) };
        const responseColumns = await apiToken<IColumn[]>(`/columnsSet`, {
          params,
        });

        if (notify) {
          responseColumns.data.forEach(async (column) => {
            const responseBoard = await apiToken<IBoard>(`/boards/${column.boardId}`);
            const { title: boardTitle } = getBoardText(responseBoard.data.title);
            showNotify(`обновлена колонка ${column.title} в доске ${boardTitle}`);
          });
        }

        const filteredColumns = responseColumns.data.filter(
          (column) => pathname === `/board/${column.boardId}`
        );
        dispatch(
          columnSlice.actions.updateColumns({
            updatedColumns: filteredColumns,
          })
        );
      }
      if (action === 'delete') {
        dispatch(
          columnSlice.actions.deleteColumns({
            deletedIds: ids,
          })
        );
        if (notify) {
          showNotify(`удалена колонка`);
        }
      }
    } catch (e) {
      handleError(dispatch, e, navigate);
    }
  };
};
