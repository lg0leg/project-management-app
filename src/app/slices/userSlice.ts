import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IStatusPayload } from 'models/typescript';
import { IUser } from 'models/dbTypes';

interface IGetUsersPayload {
  users: IUser[];
}

interface IGetUserPayload {
  user: IUser;
}

interface IHandleErrorPayload {
  code: number;
}

const initUser = {
  _id: '',
  name: '',
  login: '',
};

const initUsers: IUser[] = [initUser];

const initialState = {
  users: initUsers,
  user: initUser,
  isError: false,
  isLoading: false,
  httpCode: 200,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers(state, action: PayloadAction<IGetUsersPayload>) {
      state.users = action.payload.users;
      state.isLoading = false;
      state.isError = false;
    },

    getUser(state, action: PayloadAction<IGetUserPayload>) {
      state.user = action.payload.user;
      state.isLoading = false;
      state.isError = false;
    },

    updateUser(state, action: PayloadAction<IGetUserPayload>) {
      state.user = action.payload.user;
      state.isLoading = false;
      state.isError = false;
    },
    deleteUser(state) {
      state.user = initialState.user;
      state.isLoading = false;
      state.isError = false;
    },

    setStatus(state, action: PayloadAction<IStatusPayload>) {
      state.isLoading = action.payload.isLoading;
      state.isError = action.payload.isError;
    },

    handleError(state, action: PayloadAction<IHandleErrorPayload>) {
      state.isLoading = false;
      state.isError = true;
      state.httpCode = action.payload.code;
    },
  },
});

export default userSlice.reducer;
