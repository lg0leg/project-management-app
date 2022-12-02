import { apiToken } from 'API/API';
import { AppDispatch } from 'app/store';
import { boardSlice } from '../slices/boardSlice';
import type { navigateType, IWebSocket } from 'models/typescript';
import { IBoard, IUser } from 'models/dbTypes';
import { RoutesPath } from 'constants/routes';
import { handleError } from 'utils/handleErrors';
import { fetchGetColumns } from './columnActionCreator';
import { fetchGetTasksInBoard } from './taskActionCreator';
import { getBoardText } from 'utils/getBoardText';
import { NotifyTipe } from 'constants/notifyType';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    boardSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};

const setCompleteStatus = (dispatch: AppDispatch) => {
  dispatch(
    boardSlice.actions.setStatus({
      isLoading: false,
      isError: false,
    })
  );
};

const setErrorStatus = (dispatch: AppDispatch) => {
  dispatch(
    boardSlice.actions.setStatus({
      isLoading: false,
      isError: true,
    })
  );
};
interface IBoardProps {
  _id: string;
  navigate: navigateType;
  cb?: () => void;
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

interface IBoardsByUserIdProps {
  navigate: navigateType;
  userId: string;
}

interface IBoardsByIdsListProps {
  navigate: navigateType;
  ids: string[];
}

// получение всех досок (path используется при удалении доски изнутри смотри fetchDeleteBoard)
export const fetchGetBoards = ({ navigate, cb, path }: IBoardsProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken<IBoard[]>(`/boards`);

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
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

// получение доски по id
export const fetchGetBoard = ({ _id, navigate, cb }: IBoardProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken<IBoard>(`/boards/${_id}`);

      if (response.status === 204) {
        dispatch(fetchDeleteBoard({ _id, navigate }));
        navigate(RoutesPath.NOT_FOUND);
      } else {
        dispatch(
          boardSlice.actions.getBoard({
            board: response.data,
          })
        );
        if (cb) cb();
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};
//  переделан под сокет
export const fetchCreateBoard = ({ title, owner, users, cb, navigate }: ICreateBoardProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.post<IBoard>(`/boards`, { title, owner, users });

      if (response.status >= 200 && response.status < 300 && cb) {
        setCompleteStatus(dispatch);
        cb();
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
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
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

// изменено под webSocket
// удаление доски. Если удаляется изнутри то необходимо передать path = RoutesPath.Boards
export const fetchDeleteBoard = ({ _id, navigate, path }: IDeleteBoardProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.delete<IUser>(`/boards/${_id}`);

      if (response.status >= 200 && response.status < 300) {
        setCompleteStatus(dispatch);
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

// получение списка досок по ид юзера
export const fetchGetBoardsByUser = ({ navigate, userId }: IBoardsByUserIdProps) => {
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
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

// получение досок по массиву ид досок
export const fetchGetBoardsByBoardsIdList = ({ navigate, ids }: IBoardsByIdsListProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken<IBoard[]>(`/boardsSet`, {
        params: {
          ids: JSON.stringify(ids),
        },
      });

      dispatch(
        boardSlice.actions.getBoards({
          boards: response.data,
        })
      );
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
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
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const webSocketBoards = ({ navigate, data, showNotify }: IWebSocket) => {
  return async (dispatch: AppDispatch) => {
    const { action, ids, notify } = data;
    const { pathname } = window.location;
    try {
      if (!ids || !ids.length) return;

      if (action === 'add') {
        const params = { ids: JSON.stringify(ids) };
        const responseBoards = await apiToken<IBoard[]>(`/boardsSet`, {
          params,
        });

        if (notify) {
          responseBoards.data.forEach(async (board) => {
            const { title: boardTitle } = getBoardText(board.title);
            showNotify({ type: NotifyTipe.ADD_BOARD, board: boardTitle });
          });
        }

        if (pathname === RoutesPath.BOARDS) {
          dispatch(
            boardSlice.actions.addBoards({
              boards: responseBoards.data,
            })
          );
        }
      }
      if (action === 'delete') {
        if (notify) {
          ids.forEach((id) => {
            if (pathname === `/board/${id}`) {
              showNotify({ type: NotifyTipe.DELETE_BOARD_INNER });
              navigate(RoutesPath.BOARDS);
            } else {
              showNotify({ type: NotifyTipe.DELETE_BOARD });
            }
          });
        }

        dispatch(
          boardSlice.actions.deleteBoards({
            deletedIds: ids,
          })
        );
      }
    } catch (e) {
      handleError(dispatch, e, navigate);
    }
  };
};
