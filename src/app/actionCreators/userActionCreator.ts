import { apiToken } from 'API/API';
import { AppDispatch } from 'app/store';
import { userSlice } from '../slices/userSlice';
import type { IUser } from 'models/typescript';
import { AxiosError } from 'axios';
import { logout } from './authActionCreators';

interface IPropsUser {
  _id: string;
  navigate: (path: string) => void;
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

      const response = await apiToken<IUser[]>(`auth/users`);
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

export const fetchGetUser = ({ _id, navigate }: IPropsUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        userSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken<IUser>(`auth/users/${_id}`);

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

export const fetchUpdateUser = ({ _id, navigate }: IPropsUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        userSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken.put<IUser>(`auth/users/${_id}`);

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

export const fetchDeleteUser = ({ _id, navigate }: IPropsUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(
        userSlice.actions.setStatus({
          isLoading: true,
          isError: false,
        })
      );

      const response = await apiToken.delete<IUser>(`auth/users/${_id}`);
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
