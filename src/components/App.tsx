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
import { ToastContainer, Zoom, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
}

const cbShow = async ({ event, data, showNotify }: ICbShow) => {
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
  if (event === 'columns') {
    if (action === 'add') {
      if (!ids || !ids.length) return;
      const params = { ids: JSON.stringify(ids) };
      const responseColumn = await apiToken<IColumn[]>(`/columnsSet`, { params });
      responseColumn.data.forEach(async (column) => {
        const responseBoard = await apiToken<IBoard>(`/boards/${column.boardId}`);
        const { title: boardTitle } = getBoardText(responseBoard.data.title);
        showNotify(`Добавлена колонка ${column.title} в доске ${boardTitle}`);
      });
    }
    if (action === 'update') {
      if (!ids || !ids.length) return;
      const params = { ids: JSON.stringify(ids) };
      const responseColumn = await apiToken<IColumn[]>(`/columnsSet`, { params });
      responseColumn.data.forEach(async (column) => {
        const responseBoard = await apiToken<IBoard>(`/boards/${column.boardId}`);
        const { title: boardTitle } = getBoardText(responseBoard.data.title);
        showNotify(`обновлена колонка ${column.title} в доске ${boardTitle}`);
      });
    }
    if (action === 'delete') {
      showNotify(`удалена колонка`);
    }
  }
  if (event === 'boards') {
    if (action === 'add') {
      if (!ids || !ids.length) return;
      const params = { ids: JSON.stringify(ids) };
      const responseBoards = await apiToken<IBoard[]>(`/boardsSet`, {
        params,
      });
      responseBoards.data.forEach(async (board) => {
        const responseBoard = await apiToken<IBoard>(`/boards/${board._id}`);
        const { title: boardTitle } = getBoardText(responseBoard.data.title);
        showNotify(`Добавлена доска ${boardTitle}`);
      });
    }
    if (action === 'delete') {
      showNotify(`удалена доска`);
    }
  }
};

function App() {
  const infoNotify = (text: string) => toast.info(text);
  const location = useLocation();
  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket is connected');
    });

    socket.on('disconnect', () => {
      console.log('socket is disconnected');
    });

    socket.on('boards', (data) => {
      cbShow({ event: 'boards', data, showNotify: infoNotify });
    });
    socket.on('columns', (data) => {
      cbShow({ event: 'columns', data, showNotify: infoNotify });
    });
    socket.on('tasks', (data: ISocketResponse) => {
      cbShow({ event: 'tasks', data, showNotify: infoNotify });
    });
    socket.on('points', (data) => {
      // console.log('location', location);
      // console.log('socket points', data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('boards');
      socket.off('columns');
      socket.off('tasks');
      socket.off('users');
      socket.off('files');
      socket.off('points');
    };
  }, []);

  // const testNotify = () =>
  //   toast(
  //     <div className="flex gap-[10px]">
  //       <BiTrash size={20} color="rgb(107, 114, 128, 1)" /> <span>Tu-du-du-du ty-ty!</span>
  //     </div>,
  //     {
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       transition: Slide,
  //     }
  //   );
  // const sucsNotify = () => toast.success('Uspeh!');
  // const warnNotify = () => toast.warn('Uuu');
  // const errorNotify = () => toast.error('Oppa..');

  return (
    <>
      <ToastContainer
        position="top-right"
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
