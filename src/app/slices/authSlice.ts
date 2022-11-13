import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoutesPath } from 'constants/routes';

interface ILogoutPayload {
  navigate: (path: string) => void;
}
interface ILoginSuccessPayload {
  login: string;
  token: string;
  navigate: (path: string) => void;
}
interface IHandleErrorPayload {
  code: number;
}
interface ILoadingPayload {
  isLoading: boolean;
}

const initialState = {
  login: localStorage.getItem('LOGIN') || '',
  token: localStorage.getItem('TOKEN') || '',
  isAuth: false,
  isError: false,
  errorText: '',
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state, action: PayloadAction<ILogoutPayload>) {
      state.isAuth = false;
      state.isLoading = false;
      state.token = '';
      state.login = '';
      state.isError = false;
      state.errorText = '';

      localStorage.removeItem('TOKEN');
      localStorage.removeItem('LOGIN');
      localStorage.removeItem('IS_AUTH');
      action.payload.navigate(RoutesPath.WELCOME);
    },

    loginSuccess(state, action: PayloadAction<ILoginSuccessPayload>) {
      state.login = action.payload.login;
      state.token = action.payload.token;
      state.isLoading = false;
      state.isAuth = true;
      state.isError = false;
      state.errorText = '';

      localStorage.setItem('TOKEN', action.payload.token);
      localStorage.setItem('LOGIN', action.payload.login);
      localStorage.setItem('IS_AUTH', 'true');
      action.payload.navigate(RoutesPath.BOARDS);
    },

    handleError(state, action: PayloadAction<IHandleErrorPayload>) {
      state.isLoading = false;
      state.isError = true;
      switch (action.payload.code) {
        case 409:
          state.errorText = 'This login is already taken';
          break;
        case 401:
          state.errorText = 'Wrong password/login';
          break;
      }
    },

    setLoading(state, action: PayloadAction<ILoadingPayload>) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export default authSlice.reducer;
