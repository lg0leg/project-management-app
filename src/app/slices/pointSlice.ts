import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IStatusPayload, IHandleErrorPayload } from 'models/typescript';
import type { IPoint } from 'models/dbTypes';

const initPoints: IPoint[] = [];

const initPoint = {
  _id: '',
  title: '',
  taskId: '',
  boardId: '',
  done: false,
};

const initialState = {
  points: initPoints,
  point: initPoint,
  isError: false,
  isLoading: false,
  httpCode: 200,
};

interface IPointsPayload {
  points: IPoint[];
}
interface IPointPayload {
  point: IPoint;
}

interface IUpdatePointsPayload {
  updatedPoints: IPoint[];
}

export const pointSlice = createSlice({
  name: 'point',
  initialState,
  reducers: {
    getPoints(state, action: PayloadAction<IPointsPayload>) {
      state.points = action.payload.points;
      state.isLoading = false;
      state.isError = false;
    },
    addPoint(state, action: PayloadAction<IPointPayload>) {
      state.points = [...state.points, action.payload.point];
      state.isLoading = false;
      state.isError = false;
    },

    addPoints(state, action: PayloadAction<IPointsPayload>) {
      state.points = [...state.points, ...action.payload.points];
    },

    updatePoints(state, action: PayloadAction<IUpdatePointsPayload>) {
      const updatedPoints = action.payload.updatedPoints;
      state.points = state.points.map((point) => {
        for (let i = 0; i < updatedPoints.length; i++) {
          if (point._id === updatedPoints[i]._id) return updatedPoints[i];
        }
        return point;
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

export default pointSlice.reducer;
