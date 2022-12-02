import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IStatusPayload, IHandleErrorPayload } from 'models/typescript';
import type { IBoard } from 'models/dbTypes';

const initUsersBoard: string[] = [];

const initBoard = {
  _id: '',
  title: '',
  owner: '',
  users: initUsersBoard,
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
interface IDeleteBoardsPayload {
  deletedIds: string[];
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

    addBoards(state, action: PayloadAction<IBoardsPayload>) {
      state.boards = [...state.boards, ...action.payload.boards];
    },

    deleteBoards(state, action: PayloadAction<IDeleteBoardsPayload>) {
      state.boards = state.boards.filter(
        (board) => !action.payload.deletedIds.some((deletedId) => board._id === deletedId)
      );
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
