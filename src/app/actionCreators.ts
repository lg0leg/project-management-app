import { api } from 'API/API';
import { AppDispatch } from 'app/store';
import { authSlice } from './slices/authSlice';
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from 'model/typescript';
import { AxiosError } from 'axios';

interface IPropsRegister {
  data: IRegisterRequest;
  navigate: (path: string) => void;
}
interface IPropsLogin {
  password: string;
  login: string;
  navigate: (path: string) => void;
}

export const fetchRegister = ({ data, navigate }: IPropsRegister) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.post<IRegisterResponse>(`auth/signup`, data);
      dispatch(
        fetchLogin({
          password: data.password,
          login: response.data.login,
          navigate,
        })
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(
          authSlice.actions.handleError({
            code: e.response?.status as number,
            token: '',
            login: '',
            navigate,
          })
        );
      }
    }
  };
};

export const fetchLogin = ({ login, password, navigate }: IPropsLogin) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.post<ILoginResponse>(`auth/signin`, {
        login,
        password,
      });
      dispatch(
        authSlice.actions.loginSuccess({
          token: response.data.token,
          login,
          code: 200,
          navigate,
        })
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(
          authSlice.actions.handleError({
            code: e.response?.status as number,
            token: '',
            login: '',
            navigate,
          })
        );
      }
    }
  };
};
