import { api } from 'API/API';
import { AppDispatch } from 'app/store';
import authSlice from './slices/authSlice';

interface IRegisterRequest {
  name: string;
  login: string;
  password: string;
}
interface IRegisterResponse {
  _id: 'string';
  name: 'string';
  login: 'string';
}
interface ILoginResponse {
  token: string;
}

export const FetchRegister = (data: IRegisterRequest) => {
  return async (dispatch: AppDispatch) => {
    try {
      const responseRegister = await api.post<IRegisterResponse>(`auth/register`, data);

      const responseLogin = await api.post<ILoginResponse>(`auth/login`, {
        login: data.login,
        password: data.password,
      });

      dispatch(
        authSlice.actions.loginSuccess({
          token: responseLogin.data.token
          login: data.login,
        })
      );
    } catch (e) {
      console.log('Error register', e);
    }
  };
};
