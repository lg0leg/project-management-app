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
import { stringify } from 'querystring';

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

interface IPropsConfirmEditUser extends IPropsLogin {
  cb: () => void;
}

export const fetchNotify = ({ data, navigate }: IPropsRegister) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.post<IRegisterResponse>(`auth/signup`, data);

      // dispatch(
      //   addNotify({
      //     notify: 'string',
      //   })
      // );
    } catch (e) {
      handleAuthError(dispatch, e, navigate);
    }
  };
};
