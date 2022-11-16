import { apiToken } from 'API/API';
import { AppDispatch } from 'app/store';
import { boardSlice } from '../slices/boardSlice';
import type { IUser } from 'models/typescript';
import { AxiosError } from 'axios';
import { logout } from './authActionCreators';
import { IBoard } from 'models/dbTypes';
import { RoutesPath } from 'constants/routes';

interface IBoardProps {
  _id: string;
  navigate: (path: string) => void;
}

interface IBoardsProps {
  path?: string;
  navigate: (path: string) => void;
}

interface IDeleteBoardProps extends IBoardsProps {
  _id: string;
}
interface IUpdateBoardProps extends IBoardProps {
  board: IBoard;
  navigate: (path: string) => void;
  fromPage: string;
}

interface IBoardsByIdsListProps {
  navigate: (path: string) => void;
  userId: string[];
}
// получение всех досок (path используется при удалении доски изнутри смотри fetchDeleteBoard)
export const fetchGetBoards = ({ navigate, path }: IBoardsProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        boardSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken<IBoard[]>(`/boards`);

      if (response.status >= 200 && response.status < 300) {
        dispatch(
          boardSlice.actions.getBoards({
            boards: response.data,
          })
        );

        if (path) navigate(path);
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const code = e.response?.status as number;
        if (code === 401) {
          dispatch(logout(navigate));
        }
      }
    }
  };
};

// получение доски по id
export const fetchGetBoard = ({ _id, navigate }: IBoardProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        boardSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken<IBoard>(`/boards/${_id}`);

      dispatch(
        boardSlice.actions.getBoard({
          board: response.data,
        })
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        const code = e.response?.status as number;
        if (code === 401) {
          dispatch(logout(navigate));
        }
      }
    }
  };
};

// редактирование доски. Если редактируетсся изнутри, то необходимо передать
//  fromPage = RoutesPath.Board, иначе fromPage = RoutesPath.Boards
export const fetchUpdateBoard = ({ board, navigate, fromPage }: IUpdateBoardProps) => {
  const { _id, users, title, owner } = board;
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        boardSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken.put<IBoard>(`/boards/${_id}`, { users, title, owner });

      if (response.status >= 200 && response.status < 300) {
        if (fromPage === RoutesPath.BOARD) {
          dispatch(
            fetchGetBoard({
              _id,
              navigate,
            })
          );
        }

        if (fromPage === RoutesPath.BOARDS) {
          dispatch(
            fetchGetBoards({
              navigate,
            })
          );
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const code = e.response?.status as number;
        if (code === 401) {
          dispatch(logout(navigate));
        }
      }
    }
  };
};
// удаление доски. Если удаляется изнутри то необходимо передать path = RoutesPath.Boards
export const fetchDeleteBoard = ({ _id, navigate, path }: IDeleteBoardProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        boardSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken.delete<IUser>(`/boards/${_id}`);

      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchGetBoards({ navigate, path }));
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const code = e.response?.status as number;
        if (code === 401) {
          dispatch(logout(navigate));
        }
      }
    }
  };
};
// получение списка досок по ид юзера
export const fetchGetBoardsByUser = ({ navigate, userId }: IBoardsByIdsListProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        boardSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken<IBoard[]>(`/boardsSet/${userId}`);

      dispatch(
        boardSlice.actions.getBoards({
          boards: response.data,
        })
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        const code = e.response?.status as number;
        if (code === 401) {
          dispatch(logout(navigate));
        }
      }
    }
  };
};

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
