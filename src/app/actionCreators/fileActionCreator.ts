import { apiToken } from 'API/API';
import { AppDispatch } from 'app/store';
import type { navigateType } from 'models/typescript';
import { IFile } from 'models/dbTypes';
import { handleError } from 'utils/handleErrors';
import { fileSlice } from 'app/slices/fileSlice';
import { fetchGetAllBoardStore } from './boardActionCreator';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    fileSlice.actions.setStatus({
      isLoading: true,
      isError: false,
    })
  );
};
const setErrorStatus = (dispatch: AppDispatch) => {
  dispatch(
    fileSlice.actions.setStatus({
      isLoading: false,
      isError: true,
    })
  );
};
interface IFileParams {
  ids?: string[];
  taskId?: string;
  userId?: string;
}
interface IGetFilesProps extends IFileParams {
  navigate: navigateType;
}

interface IGetFilesByBoardIdProps {
  navigate: navigateType;
  boardId: string;
}

interface IDeleteFilesProps {
  navigate: navigateType;
  fileId: string;
}

interface IAddFileProps {
  navigate: navigateType;
  taskId: string;
  boardId: string;
  file: File;
}

// получение всех файлов по параметрам:
export const fetchGetFilesByParams = ({ navigate, ids, taskId, userId }: IGetFilesProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const params: IFileParams = {};
      if (userId) params.userId = userId;
      if (taskId) params.taskId = taskId;
      if (ids && ids.length) params.ids = ids;
      const response = await apiToken<IFile[]>(`/file`, { params });

      dispatch(
        fileSlice.actions.getFiles({
          files: response.data,
        })
      );
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchGetFilesByBoardId = ({ navigate, boardId }: IGetFilesByBoardIdProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const response = await apiToken<IFile[]>(`/file/${boardId}`);

      dispatch(
        fileSlice.actions.getFiles({
          files: response.data,
        })
      );
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchDeleteFile = ({ navigate, fileId }: IDeleteFilesProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const response = await apiToken.delete<IFile>(`/file/${fileId}`);
      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchGetAllBoardStore({ _id: response.data.boardId, navigate }));
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};

export const fetchAddFile = ({ navigate, file, boardId, taskId }: IAddFileProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('boardId', boardId);
      formData.append('taskId', taskId);

      const response = await apiToken.post<IFile[]>(`/file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        dispatch(fetchGetAllBoardStore({ _id: boardId, navigate }));
      }
    } catch (e) {
      setErrorStatus(dispatch);
      handleError(dispatch, e, navigate);
    }
  };
};
