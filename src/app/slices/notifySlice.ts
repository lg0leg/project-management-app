import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IStatusPayload } from 'models/typescript';
import { IUser } from 'models/dbTypes';

interface IAddNotifyPayload {
  notify: string;
}
const initNotify: string[] = [];

const initialState = {
  notify: initNotify,
};

export const userSlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    addNotify(state, action: PayloadAction<IAddNotifyPayload>) {
      state.notify.push(action.payload.notify);
    },

    clearNotify(state) {
      state.notify = [];
    },
  },
});

export default userSlice.reducer;
