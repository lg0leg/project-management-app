import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IStatusPayload, IHandleErrorPayload } from 'models/typescript';
import type { ITask } from 'models/dbTypes';

const initTasks: ITask[] = [];

const initUsersTask: string[] = [];

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

const initialState = {
  isError: false,
  isLoading: false,
  httpCode: 200,
  tasks: initTasks,
  task: initTask,
};

interface ITasksPayload {
  tasks: ITask[];
}

interface ITaskPayload {
  task: ITask;
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTasks(state, action: PayloadAction<ITasksPayload>) {
      state.tasks = action.payload.tasks;
      state.isLoading = false;
      state.isError = false;
    },

    getTask(state, action: PayloadAction<ITaskPayload>) {
      state.task = action.payload.task;
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

export default taskSlice.reducer;
