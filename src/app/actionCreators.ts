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
      const response = await api.post<IRegisterResponse>(`auth/signup`, data);
      console.log(response.statusText);
      console.log(response.status);
      if (response.status < 200 && response.status > 299) {
        dispatch(
          authSlice.actions.handleError({
            code: response.status,
            token: '',
            login: '',
          })
        );
        throw new Error('responseRegister ERROR');
      }
      dispatch(
        fetchLogin({
          password: data.password,
          login: response.data.login,
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
      const response = await api.post<ILoginResponse>(`auth/signin`, {
        login: data.login,
        password: data.password,
      });
      if (response.status < 200 && response.status > 299) {
        dispatch(
          authSlice.actions.handleError({
            code: response.status,
            token: '',
            login: '',
          })
        );
        throw new Error('response ERROR');
      }
      dispatch(
        authSlice.actions.loginSuccess({
          token: response.data.token,
          login: data.login,
          code: 200,
        })
      );
    } catch (e) {
      console.log('Error login', e);
    }
  };
};
