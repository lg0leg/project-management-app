import { api } from 'API/API';
import { AppDispatch } from 'app/store';
import { authSlice } from './slices/authSlice';
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from 'model/typescript';

export const fetchRegister = (data: IRegisterRequest) => {
  return async (dispatch: AppDispatch) => {
    try {
      console.log(data);
      const responseRegister = await api.post<IRegisterResponse>(`auth/signup`, data);
      console.log(responseRegister.statusText);
      console.log(responseRegister.status);
      if (responseRegister.status !== 200) {
        throw new Error('responseRegister ERROR');
      }
      const responseLogin = await api.post<ILoginResponse>(`auth/signin`, {
        login: data.login,
        password: data.password,
      });

      dispatch(
        authSlice.actions.loginSuccess({
          token: responseLogin.data.token,
          login: data.login,
        })
      );
    } catch (e) {
      console.log('Error register', e);
    }
  };
};

export const fetchLogin = (data: ILoginRequest) => {
  return async (dispatch: AppDispatch) => {
    try {
      const responseLogin = await api.post<ILoginResponse>(`auth/signin`, {
        login: data.login,
        password: data.password,
      });
      dispatch(
        authSlice.actions.loginSuccess({
          token: responseLogin.data.token,
          login: data.login,
        })
      );
    } catch (e) {
      console.log('Error login', e);
    }
  };
};
