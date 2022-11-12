import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IAuthPayload {
  login: string;
  token: string;
}

const initialState = {
  login: '',
  token: '',
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.token = '';
      state.login = '';
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('LOGIN');
      localStorage.removeItem('IS_AUTH');
    },
    loginSuccess(state, action: PayloadAction<IAuthPayload>) {
      state.login = action.payload.login;
      state.token = action.payload.login;
      state.isAuth = true;
      localStorage.setItem('TOKEN', action.payload.token);
      localStorage.setItem('LOGIN', action.payload.login);
      localStorage.setItem('IS_AUTH', 'true');
    },
  },
});

export default authSlice.reducer;
