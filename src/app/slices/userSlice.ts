import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoutesPath } from 'constants/routes';
import { StorageKey } from 'constants/storageKey';
import { decodeToken } from 'react-jwt';
import type { IToken, IUser, IStatusPayload } from 'models/typescript';

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
  errorText: '',
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

    setStatus(state, action: PayloadAction<IStatusPayload>) {
      state.isLoading = action.payload.isLoading;
      state.isError = action.payload.isError;
    },

    handleError(state, action: PayloadAction<IHandleErrorPayload>) {
      state.isLoading = false;
      state.isError = true;
      if (action.payload.code === 409) {
        state.errorText = 'Login is already exist';
      }
    },
  },
});

export default userSlice.reducer;
