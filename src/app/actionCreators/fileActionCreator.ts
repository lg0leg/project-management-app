import { apiToken } from 'API/API';
import { AppDispatch } from 'app/store';
import { boardSlice } from '../slices/boardSlice';
import type { navigateType } from 'models/typescript';
import { IFile } from 'models/dbTypes';
import { RoutesPath } from 'constants/routes';
import { handleError401 } from 'utils/handleErrors';
import { fileSlice } from 'app/slices/fileSlice';

const setLoadingStatus = (dispatch: AppDispatch) => {
  dispatch(
    boardSlice.actions.setStatus({
      isLoading: true,
      isError: false,
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
      handleError401(dispatch, e, navigate);
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
      handleError401(dispatch, e, navigate);
    }
  };
};

export const fetchDeleteFile = ({ navigate, fileId }: IDeleteFilesProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      setLoadingStatus(dispatch);
      const response = await apiToken.delete<IFile[]>(`/file/${fileId}`);

      dispatch(
        fileSlice.actions.getFiles({
          files: response.data,
        })
      );
    } catch (e) {
      handleError401(dispatch, e, navigate);
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

      dispatch(
        fileSlice.actions.getFiles({
          files: response.data,
        })
      );
    } catch (e) {
      handleError401(dispatch, e, navigate);
    }
  };
};
