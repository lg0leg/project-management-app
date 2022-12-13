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

interface IDeleteTasksPayload {
  deletedIds: string[];
}

interface IUpdateTasksPayload {
  updatedTasks: ITask[];
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

    addTasks(state, action: PayloadAction<ITasksPayload>) {
      state.tasks = [...state.tasks, ...action.payload.tasks];
    },

    deleteTasks(state, action: PayloadAction<IDeleteTasksPayload>) {
      state.tasks = state.tasks.filter(
        (task) => !action.payload.deletedIds.some((deletedId) => task._id === deletedId)
      );
    },

    updateTasks(state, action: PayloadAction<IUpdateTasksPayload>) {
      const updatedTasks = action.payload.updatedTasks;
      state.tasks = state.tasks.map((task) => {
        for (let i = 0; i < updatedTasks.length; i++) {
          if (task._id === updatedTasks[i]._id) return updatedTasks[i];
        }
        return task;
      });
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
