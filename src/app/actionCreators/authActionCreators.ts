import { api } from 'API/API';
import { AppDispatch } from 'app/store';
import { authSlice } from '../slices/authSlice';
import {
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  navigateType,
} from 'models/typescript';
import { AxiosError } from 'axios';
const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    authSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};
interface IPropsRegister {
  data: IRegisterRequest;
  navigate: navigateType;
}
interface IPropsLogin {
  password: string;
  login: string;
  navigate: navigateType;
}

export const fetchRegister = ({ data, navigate }: IPropsRegister) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

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
          })
        );
      }
    }
  };
};

export const fetchLogin = ({ login, password, navigate }: IPropsLogin) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);

      const response = await api.post<ILoginResponse>(`auth/signin`, {
        login,
        password,
      });

      dispatch(
        authSlice.actions.loginSuccess({
          token: response.data.token,
          navigate,
        })
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(
          authSlice.actions.handleError({
            code: e.response?.status as number,
          })
        );
      }
    }
  };
};

export const logout = (navigate: (path: string) => void) => {
  return (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.logout({ navigate }));
  };
};
