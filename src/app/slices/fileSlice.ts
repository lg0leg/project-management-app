import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IStatusPayload, IHandleErrorPayload } from 'models/typescript';
import type { IFile } from 'models/dbTypes';

const initFiles: IFile[] = [];

const initFile = {
  _id: '',
  name: '',
  taskId: '',
  boardId: '',
  path: '',
};

const initialState = {
  files: initFiles,
  file: initFile,
  isError: false,
  isLoading: false,
  httpCode: 200,
};

interface IFilesPayload {
  files: IFile[];
}

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    getFiles(state, action: PayloadAction<IFilesPayload>) {
      state.files = action.payload.files;
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

export default fileSlice.reducer;
