import { apiToken } from 'API/API';
import { AppDispatch } from 'app/store';
import { boardSlice } from '../slices/boardSlice';
import type { navigateType } from 'models/typescript';
import { IBoard, IUser } from 'models/dbTypes';
import { RoutesPath } from 'constants/routes';
import { handleError401 } from 'utils/handleErrors';
import { fetchGetColumns } from './columnActionCreator';
import { fetchGetTasksInBoard } from './taskActionCreator';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    boardSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};
interface IBoardProps {
  _id: string;
  navigate: navigateType;
}
interface ICreateBoardProps {
  owner: string;
  title: string;
  users: string[];
  cb?: () => void;
  navigate: navigateType;
}

interface IBoardsProps {
  cb?: () => void;
  path?: string;
  navigate: navigateType;
}

interface IDeleteBoardProps extends IBoardsProps {
  _id: string;
}
interface IUpdateBoardProps {
  board: IBoard;
  fromPage: string;
  navigate: navigateType;
}

interface IBoardsByIdsListProps {
  navigate: navigateType;
  userId: string[];
}

// получение всех досок (path используется при удалении доски изнутри смотри fetchDeleteBoard)
export const fetchGetBoards = ({ navigate, cb, path }: IBoardsProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken<IBoard[]>(`/boards`);
      console.log(response.data);

      if (response.status >= 200 && response.status < 300) {
        dispatch(
          boardSlice.actions.getBoards({
            boards: response.data,
          })
        );
        if (cb) cb();
        if (path) navigate(path);
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

// получение доски по id
export const fetchGetBoard = ({ _id, navigate }: IBoardProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken<IBoard>(`/boards/${_id}`);

      dispatch(
        boardSlice.actions.getBoard({
          board: response.data,
        })
      );
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchCreateBoard = ({ title, owner, users, cb, navigate }: ICreateBoardProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      console.log('title', title);
      console.log('owner', owner);

      const response = await apiToken.post<IBoard>(`/boards`, { title, owner, users });
      dispatch(
        boardSlice.actions.getBoard({
          board: response.data,
        })
      );

      if (response.status >= 200 && response.status < 300 && cb) {
        cb();
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};
// редактирование доски. Если редактируетсся изнутри, то необходимо передать
//  fromPage = RoutesPath.Board, иначе fromPage = RoutesPath.Boards
export const fetchUpdateBoard = ({ board, navigate, fromPage }: IUpdateBoardProps) => {
  const { _id, users, title, owner } = board;
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

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
      handleError401(dispatch, e, navigate);
    }
  };
};

// удаление доски. Если удаляется изнутри то необходимо передать path = RoutesPath.Boards
export const fetchDeleteBoard = ({ _id, navigate, path }: IDeleteBoardProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.delete<IUser>(`/boards/${_id}`);

      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchGetBoards({ navigate, path }));
      }
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

// получение списка досок по ид юзера
export const fetchGetBoardsByUser = ({ navigate, userId }: IBoardsByIdsListProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken<IBoard[]>(`/boardsSet/${userId}`);

      dispatch(
        boardSlice.actions.getBoards({
          boards: response.data,
        })
      );
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchGetAllBoardStore = ({ _id, navigate }: IBoardProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchGetBoard({ _id, navigate }));
      dispatch(fetchGetColumns({ boardId: _id, navigate }));
      dispatch(fetchGetTasksInBoard({ boardId: _id, navigate }));
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};
