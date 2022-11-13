import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoutesPath } from 'constants/routes';
import { StorageKey } from 'constants/storageKey';

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
interface IStatusPayload {
  isLoading: boolean;
  isError: boolean;
}

const initialState = {
  login: localStorage.getItem(StorageKey.LOGIN) || '',
  token: localStorage.getItem(StorageKey.TOKEN) || '',
  isAuth: Boolean(localStorage.getItem(StorageKey.TOKEN) ?? ''),
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

      localStorage.removeItem(StorageKey.TOKEN);
      localStorage.removeItem(StorageKey.LOGIN);
      localStorage.removeItem(StorageKey.IS_AUTH);
      action.payload.navigate(RoutesPath.WELCOME);
    },

    loginSuccess(state, action: PayloadAction<ILoginSuccessPayload>) {
      state.login = action.payload.login;
      state.token = action.payload.token;
      state.isLoading = false;
      state.isAuth = true;
      state.isError = false;
      state.errorText = '';

      localStorage.setItem(StorageKey.TOKEN, action.payload.token);
      localStorage.setItem(StorageKey.LOGIN, action.payload.login);
      localStorage.setItem(StorageKey.IS_AUTH, 'true');
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

    setStatus(state, action: PayloadAction<IStatusPayload>) {
      state.isLoading = action.payload.isLoading;
      state.isError = action.payload.isError;
    },
  },
});

export default authSlice.reducer;
