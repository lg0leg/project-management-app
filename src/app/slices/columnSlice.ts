import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IStatusPayload, IHandleErrorPayload } from 'models/typescript';
import type { IColumn } from 'models/dbTypes';

const initColumn: IColumn = {
  _id: '',
  title: '',
  order: 0,
  boardId: '',
};

const initColumns: IColumn[] = [];

const initialState = {
  isError: false,
  isLoading: false,
  httpCode: 200,
  columns: initColumns,
  column: initColumn,
};

interface IColumnsPayload {
  columns: IColumn[];
}

interface IColumnPayload {
  column: IColumn;
}

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
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

export default columnSlice.reducer;
