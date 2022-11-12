import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IAuthPayload {
  login: string;
  token: string;
  code: number;
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
    logout(state) {
      state.isAuth = false;
      state.token = '';
      state.login = '';
      state.isError = false;
      state.errorText = '';
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('LOGIN');
      localStorage.removeItem('IS_AUTH');
    },
    loginSuccess(state, action: PayloadAction<IAuthPayload>) {
      state.login = action.payload.login;
      state.token = action.payload.login;
      state.isAuth = true;
      state.isError = false;
      state.errorText = '';
      localStorage.setItem('TOKEN', action.payload.token);
      localStorage.setItem('LOGIN', action.payload.login);
      localStorage.setItem('IS_AUTH', 'true');
    },
    handleError(state, action: PayloadAction<IAuthPayload>) {
      console.log('handleError');
      console.log('code ' + action.payload.code);

      state.isAuth = false;
      state.isError = true;
      switch (action.payload.code) {
        case 409:
          state.errorText = 'the login is already taken';
          break;
        case 401:
          state.errorText = 'wrong password/login';
          break;
      }
    },
  },
});

export default authSlice.reducer;
