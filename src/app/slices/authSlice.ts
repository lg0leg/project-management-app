import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoutesPath } from 'constants/routes';
import { StorageKey } from 'constants/storageKey';
import type { IStatusPayload, navigateType, IHandleErrorPayload } from 'models/typescript';
import { isExpired } from 'react-jwt';
interface ILogoutPayload {
  navigate: navigateType;
}
interface ILoginSuccessPayload {
  token: string;
  navigate: navigateType;
  notRedirect?: boolean;
}
interface ILoginReloadPayload {
  token: string;
}

const initialState = {
  token: localStorage.getItem(StorageKey.TOKEN) || '',
  isAuth: Boolean(!isExpired(localStorage.getItem(StorageKey.TOKEN) ?? '')),
  isError: false,
  httpCode: 200,
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
      state.isError = false;
      state.httpCode = 200;

      localStorage.removeItem(StorageKey.TOKEN);
      action.payload.navigate(RoutesPath.WELCOME);
    },

    loginSuccess(state, action: PayloadAction<ILoginSuccessPayload>) {
      state.token = action.payload.token;

      state.isLoading = false;
      state.isAuth = true;
      state.isError = false;
      state.httpCode = 200;

      localStorage.setItem(StorageKey.TOKEN, action.payload.token);
      if (!action.payload.notRedirect) {
        action.payload.navigate(RoutesPath.BOARDS);
      }
    },

    loginReload(state, action: PayloadAction<ILoginReloadPayload>) {
      state.token = action.payload.token;

      state.isLoading = false;
      state.isAuth = true;
      state.isError = false;
      state.httpCode = 200;
    },

    handleError(state, action: PayloadAction<IHandleErrorPayload>) {
      state.isLoading = false;
      state.isError = true;
      state.httpCode = action.payload.code;
    },

    setStatus(state, action: PayloadAction<IStatusPayload>) {
      state.isLoading = action.payload.isLoading;
      state.isError = action.payload.isError;
    },
  },
});

export default authSlice.reducer;
