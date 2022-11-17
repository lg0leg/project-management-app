import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IStatusPayload } from 'models/typescript';
import type { IBoard, IColumn, ITask } from 'models/dbTypes';

interface IHandleErrorPayload {
  code: number;
}

const initColumn: IColumn = {
  _id: '',
  title: '',
  order: 0,
  boardId: '',
};

const initColumns: IColumn[] = [];
const initTasks: ITask[] = [];

const initUsersBoard: string[] = [];
const initUsersTask: string[] = [];

const initBoard = {
  _id: '',
  title: '',
  owner: '',
  users: initUsersBoard,
};

const initTask = {
  _id: '',
  title: '',
  order: 0,
  boardId: '',
  columnId: '',
  description: '',
  userId: '',
  users: initUsersTask,
};

const initBoards: IBoard[] = [];

const initialState = {
  boards: initBoards,
  board: initBoard,
  isError: false,
  isLoading: false,
  httpCode: 200,
  columns: initColumns,
  column: initColumn,
  tasks: initTasks,
  task: initTask,
};

interface IBoardsPayload {
  boards: IBoard[];
}

interface IBoardPayload {
  board: IBoard;
}

interface IColumnsPayload {
  columns: IColumn[];
}

interface IColumnPayload {
  column: IColumn;
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

    getColumns(state, action: PayloadAction<IColumnsPayload>) {
      state.columns = action.payload.columns;
      state.isLoading = false;
      state.isError = false;
    },

    getColumn(state, action: PayloadAction<IColumnPayload>) {
      state.column = action.payload.column;
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
