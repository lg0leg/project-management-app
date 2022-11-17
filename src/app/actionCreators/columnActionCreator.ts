import { apiToken } from 'API/API';
import type { AppDispatch } from 'app/store';
import { boardSlice } from '../slices/boardSlice';
import type { IUser } from 'models/typescript';
import type { IColumn } from 'models/dbTypes';
import { handleError401 } from 'utils/handleErrors';
import type { navigateType } from 'models/typescript';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    boardSlice.actions.setStatus({
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

interface IBoardsByIdsListProps {
  navigate: navigateType;
  userId: string[];
}

export const fetchGetColumns = ({ navigate, boardId }: IColumnsProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const response = await apiToken<IColumn[]>(`/boards/${boardId}/columns`);

      dispatch(
        boardSlice.actions.getColumns({
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
        boardSlice.actions.getColumn({
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
    } catch (e) {}
  };
};

export const fetchUpdateColumn = ({ column, navigate }: IUpdateColumnProps) => {
  const { _id: columnId, boardId } = column;
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.put<IColumn>(
        `/boards/${boardId}/columns/${columnId}`,
        column
      );

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

export const fetchDeleteBoard = ({ columnId, navigate, boardId }: IColumnProps) => {
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

// export const fetchGetBoardsByUser = ({ navigate, userId }: IBoardsByIdsListProps) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       dispatch(
//         boardSlice.actions.setStatus({
//           isLoading: true,
//           isError: false,
//         })
//       );

//       const response = await apiToken<IBoard[]>(`/boardsSet/${userId}`);

//       dispatch(
//         boardSlice.actions.getBoards({
//           boards: response.data,
//         })
//       );
//     } catch (e) {
//       handleError401(dispatch, e, navigate);
//     }
//   };
// };

// export const fetchGetBoardsByIdsList = ({ navigate, idsList }: IBoardsByIdsListProps) => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       dispatch(
//         boardSlice.actions.setStatus({
//           isLoading: true,
//           isError: false,
//         })
//       );

//       const response = await apiToken<IBoard[]>(`/boardsSet`);

//       dispatch(
//         boardSlice.actions.getBoards({
//           boards: response.data,
//         })
//       );
//     } catch (e) {
//       if (e instanceof AxiosError) {
//         const code = e.response?.status as number;
//         if (code === 401) {
//           dispatch(logout(navigate));
//         }
//       }
//     }
//   };
// };
