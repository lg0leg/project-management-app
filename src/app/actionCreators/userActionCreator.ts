import { apiToken } from 'API/API';
import { AppDispatch } from 'app/store';
import { userSlice } from '../slices/userSlice';
import type { navigateType } from 'models/typescript';
import { IUser } from 'models/dbTypes';
import { AxiosError } from 'axios';
import { logout } from './authActionCreators';
import { handleError } from 'utils/handleErrors';
import { toast } from 'react-toastify';
import { LangKey } from 'constants/lang';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    userSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};
const setErrorStatus = (dispatch: AppDispatch) => {
  dispatch(
    userSlice.actions.setStatus({
      isLoading: false,
      isError: true,
    })
  );
};
interface IUserProps {
  _id: string;
  navigate: navigateType;
  cb?: () => void;
}

interface IDeleteUserProps extends IUserProps {
  lang: string;
}

interface IUpdateUserProps extends IUserProps {
  login: string;
  name: string;
  password: string;
  cb?: () => void;
  lang: string;
}

export const fetchGetUsers = (navigate: (path: string) => void) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken<IUser[]>(`/users`);
      dispatch(
        userSlice.actions.getUsers({
          users: response.data,
        })
      );
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchGetUser = ({ _id, navigate, cb }: IUserProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken<IUser>(`/users/${_id}`);

      dispatch(
        userSlice.actions.getUser({
          user: response.data,
        })
      );

      if (response.status >= 200 && response.status < 300 && cb) {
        cb();
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchUpdateUser = ({
  _id,
  login,
  name,
  password,
  navigate,
  lang,
}: IUpdateUserProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.put<IUser>(`/users/${_id}`, { login, name, password });

      dispatch(
        userSlice.actions.getUser({
          user: response.data,
        })
      );
      if (response.status >= 200 && response.status < 300) {
        toast.success(lang === LangKey.EN ? 'Profile updated' : 'Профиль обновлен');
      }
    } catch (e) {
      setErrorStatus(dispatch);
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

export const fetchDeleteUser = ({ _id, navigate, lang }: IDeleteUserProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await apiToken.delete<IUser>(`/users/${_id}`);
      if (response.status >= 200 && response.status < 300) {
        dispatch(userSlice.actions.deleteUser());
        dispatch(logout(navigate));
        toast.success(lang === LangKey.EN ? 'Profile deleted' : 'Профиль удален');
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};
