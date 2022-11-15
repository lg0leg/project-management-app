import { apiToken } from 'API/API';
import { AppDispatch } from 'app/store';
import { userSlice } from '../slices/userSlice';
import type { IUser } from 'models/typescript';
import { AxiosError } from 'axios';
import { logout } from './authActionCreators';

interface IUserProps {
  _id: string;
  navigate: (path: string) => void;
}

interface IUpdateUserProps extends IUserProps {
  login: string;
  name: string;
  password: string;
}

export const fetchGetUsers = (navigate: (path: string) => void) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        userSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken<IUser[]>(`/users`);
      dispatch(
        userSlice.actions.getUsers({
          users: response.data,
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

export const fetchGetUser = ({ _id, navigate }: IUserProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        userSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken<IUser>(`/users/${_id}`);

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
        if (code === 409) {
          dispatch(
            userSlice.actions.handleError({
              code: 409,
            })
          );
        }
        if (code === 401) {
          dispatch(logout(navigate));
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
      if (response.status === 200) {
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
