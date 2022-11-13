import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoutesPath } from 'constants/routes';

interface IAuthPayload {
  login: string;
  token: string;
  code: number;
  navigate: (path: string) => void;
}

const initialState = {
  login: '',
  token: '',
  isAuth: false,
  isError: false,
  errorText: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state, action: PayloadAction<IAuthPayload>) {
      state.isAuth = false;
      state.token = '';
      state.login = '';
      state.isError = false;
      state.errorText = '';

      localStorage.removeItem('TOKEN');
      localStorage.removeItem('LOGIN');
      localStorage.removeItem('IS_AUTH');
      action.payload.navigate(RoutesPath.WELCOME);
    },
    loginSuccess(state, action: PayloadAction<IAuthPayload>) {
      state.login = action.payload.login;
      state.token = action.payload.token;
      state.isAuth = true;
      state.isError = false;
      state.errorText = '';

      localStorage.setItem('TOKEN', action.payload.token);
      localStorage.setItem('LOGIN', action.payload.login);
      localStorage.setItem('IS_AUTH', 'true');
      action.payload.navigate(RoutesPath.BOARDS);
    },
    handleError(state, action: PayloadAction<IAuthPayload>) {
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
  },
});

export default authSlice.reducer;
