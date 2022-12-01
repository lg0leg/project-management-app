import React, { useEffect } from 'react';
import { Main } from '../components/Main';
import Footer from './Footer';
import Header from './Header';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { RoutesPath } from 'constants/routes';
import { BASE_URL } from 'constants/baseUrl';
import type { ITask, IUser, IBoard, IColumn } from 'models/dbTypes';
import { apiToken } from 'API/API';
import { getBoardText } from 'utils/getBoardText';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppNavigate } from 'app/hooks';
import { webSocketBoards } from 'app/actionCreators/boardActionCreator';
import { convertCompilerOptionsFromJson } from 'typescript';
import { webSocketColumns } from 'app/actionCreators/columnActionCreator';
import { webSocketTasks } from 'app/actionCreators/taskActionCreator';

const socket = io(BASE_URL);

interface ISocketResponse {
  action: string;
  guid: string;
  ids: string[];
  initUser: string;
  notify: boolean;
  users: string[];
}
interface IParamsIds {
  ids: string[];
}

const checkPath = (path: string, cbShow: () => void, cbDoAndShow?: () => void) => {
  if (
    path === RoutesPath.BOARDS ||
    path === RoutesPath.WELCOME ||
    path === RoutesPath.SIGN_IN ||
    path === RoutesPath.SIGN_UP ||
    path === RoutesPath.PROFILE
  ) {
    console.log('show only message');
  }
};

interface ICbShow {
  event: string;
  data: ISocketResponse;
  showNotify: (text: string) => void;
  path: string;
}

const cbShow = async ({ event, data, showNotify, path }: ICbShow) => {
  const { action, ids, users, notify, guid, initUser } = data;
  if (event === 'tasks') {
    if (action === 'add') {
      if (!ids || !ids.length) return;
      const responseTask = await apiToken<ITask[]>(`/tasksSet`, {
        params: { ids: JSON.stringify(ids) },
      });
      responseTask.data.forEach(async (task) => {
        const responseUser = await apiToken<IUser>(`/users/${task.userId}`);
        const responseBoard = await apiToken<IBoard>(`/boards/${task.boardId}`);
        const { title: boardTitle } = getBoardText(responseBoard.data.title);
        showNotify(
          `Добавлена таска ${task.title} юзером ${responseUser.data.login} в доске ${boardTitle}`
        );
      });
    }
    if (action === 'update') {
      if (!ids || !ids.length) return;
      const responseTasks = await apiToken<ITask[]>(`/tasksSet`, {
        params: { ids: JSON.stringify(ids) },
      });
      responseTasks.data.map(async (task) => {
        const responseBoard = await apiToken<IBoard>(`/boards/${task.boardId}`);
        const { title: boardTitle } = getBoardText(responseBoard.data.title);
        showNotify(`Обновлена таска ${task.title} в доске ${boardTitle}`);
      });
    }
    if (action === 'delete') {
      showNotify(`удалена таска`);
    }
  }
  // ----------------columns-----------------
  // if (event === 'columns') {
  //   if (action === 'add') {
  //     // if (!ids || !ids.length) return;
  //     // const params = { ids: JSON.stringify(ids) };
  //     // const responseColumn = await apiToken<IColumn[]>(`/columnsSet`, { params });
  //     // responseColumn.data.forEach(async (column) => {
  //     //   const responseBoard = await apiToken<IBoard>(`/boards/${column.boardId}`);
  //     //   const { title: boardTitle } = getBoardText(responseBoard.data.title);
  //     //   showNotify(`Добавлена колонка ${column.title} в доске ${boardTitle}`);
  //     // });
  //   }
  //   // if (action === 'update') {
  //   //   if (!ids || !ids.length) return;
  //   //   const params = { ids: JSON.stringify(ids) };
  //   //   const responseColumn = await apiToken<IColumn[]>(`/columnsSet`, { params });
  //   //   responseColumn.data.forEach(async (column) => {
  //   //     const responseBoard = await apiToken<IBoard>(`/boards/${column.boardId}`);
  //   //     const { title: boardTitle } = getBoardText(responseBoard.data.title);
  //   //     showNotify(`обновлена колонка ${column.title} в доске ${boardTitle}`);
  //   //   });
  //   }
  //   if (action === 'delete') {
  //     // showNotify(`удалена колонка`);
  //   }
  // }
  // ----------------boards-----------------
};

function App() {
  const infoNotify = (text: string) => toast.info(text);
  const location = useLocation();
  const getPath = () => location.pathname;
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket is connected');
    });

    socket.on('disconnect', () => {
      console.log('socket is disconnected');
    });

    socket.on('boards', (data) => {
      dispatch(
        webSocketBoards({
          navigate,
          data,
          showNotify: infoNotify,
        })
      );
    });

    socket.on('columns', (data) => {
      dispatch(webSocketColumns({ data, showNotify: infoNotify, navigate }));
    });
    socket.on('tasks', (data: ISocketResponse) => {
      dispatch(webSocketTasks({ data, showNotify: infoNotify, navigate }));
    });
    // socket.on('points', (data) => {
    //   // console.log('location', location);
    //   // console.log('socket points', data);
    // });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('boards');
      socket.off('columns');
      socket.off('tasks');
      // socket.off('users');
      // socket.off('files');
      // socket.off('points');
    };
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        limit={10}
        transition={Zoom}
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
