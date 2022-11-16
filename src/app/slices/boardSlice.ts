import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IStatusPayload } from 'models/typescript';
import type { IBoard } from 'models/dbTypes';

interface IHandleErrorPayload {
  code: number;
}

const initUsers: string[] = [];

const initBoard = {
  _id: '',
  title: '',
  owner: '',
  users: initUsers,
};

const initBoards: IBoard[] = [];

const initialState = {
  boards: initBoards,
  board: initBoard,
  isError: false,
  isLoading: false,
  httpCode: 200,
};

interface IBoardsPayload {
  boards: IBoard[];
}

interface IBoardPayload {
  board: IBoard;
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getBoards(state, action: PayloadAction<IBoardsPayload>) {
      state.boards = action.payload.boards;
      state.isLoading = false;
      state.isError = false;
    },

    getBoard(state, action: PayloadAction<IBoardPayload>) {
      state.board = action.payload.board;
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

export default boardSlice.reducer;
