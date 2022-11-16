import { apiToken } from 'API/API';
import { AppDispatch } from 'app/store';
import { boardSlice } from '../slices/boardSlice';
import type { IUser } from 'models/typescript';
import { AxiosError } from 'axios';
import { logout } from './authActionCreators';
import { IBoard } from 'models/dbTypes';

interface IBoardProps {
  _id: string;
  navigate: (path: string) => void;
}

interface IUpdateBoardProps extends IBoardProps {
  board: IBoard;
  navigate: (path: string) => void;
}

export const fetchGetBoards = (navigate: (path: string) => void) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        boardSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken<IBoard[]>(`/boards`);
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

export const fetchUpdateBoard = ({ board, navigate }: IUpdateBoardProps) => {
  const { _id, users, title } = board;
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        boardSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken.put<IBoard>(`/boards/${_id}`, {});

      dispatch(
        fetchGetBoard({
          _id,
          navigate,
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

export const fetchUpdateUser = ({ _id, login, name, password, navigate }: IUpdateUserProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        userSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken.put<IUser>(`/users/${_id}`, { login, name, password });

      dispatch(
        userSlice.actions.getUser({
          user: response.data,
        })
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        const code = e.response?.status as number;
        if (code === 401) {
          dispatch(logout(navigate));
        } else {
          dispatch(
            userSlice.actions.handleError({
              code,
            })
          );
        }
      }
    }
  };
};

export const fetchDeleteUser = ({ _id, navigate }: IUserProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        userSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken.delete<IUser>(`/users/${_id}`);
      if (response.status >= 200 && response.status < 300) {
        dispatch(userSlice.actions.deleteUser());
        dispatch(logout(navigate));
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
