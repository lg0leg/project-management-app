import { api } from 'API/API';
import { AppDispatch } from 'app/store';
import { authSlice } from '../slices/authSlice';
import type {
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  navigateType,
} from 'models/typescript';
import { AxiosError } from 'axios';
import { RoutesPath } from 'constants/routes';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    authSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};
const setErrorStatus = (dispatch: AppDispatch) => {
  dispatch(
    authSlice.actions.setStatus({
      isLoading: false,
      isError: true,
    })
  );
};

const handleAuthError = (dispatch: AppDispatch, e: unknown, navigate: navigateType) => {
  setErrorStatus(dispatch);
  if (e instanceof AxiosError) {
    const httpCode = e.response?.status as number;
    if (httpCode === 404) {
      navigate(RoutesPath.NOT_FOUND);
    }
    dispatch(
      authSlice.actions.handleError({
        code: httpCode,
      })
    );
  }
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
      handleAuthError(dispatch, e, navigate);
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
      handleAuthError(dispatch, e, navigate);
    }
  };
};

export const logout = (navigate: (path: string) => void) => {
  return (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.logout({ navigate }));
  };
};
