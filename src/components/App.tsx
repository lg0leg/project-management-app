import React, { useEffect } from 'react';
import { Main } from '../components/Main';
import Footer from './Footer';
import Header from './Header';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { RoutesPath } from 'constants/routes';
import { BASE_URL } from 'constants/baseUrl';
import type { ITask, IUser, IBoard } from 'models/dbTypes';
import { apiToken } from 'API/API';

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
const cbShow = async (event: string, data: ISocketResponse) => {
  const { action, ids, users, notify, guid, initUser } = data;
  if (event === 'tasks') {
    if (action === 'add') {
      if (!ids || !ids.length) return;
      const responseTask = await apiToken<ITask[]>(`/tasksSet`, {
        params: { ids: JSON.stringify(ids) },
      });
      const responseUser = await apiToken<IUser>(`/users/${responseTask.data[0].userId}`);
      const responseBoard = await apiToken<IBoard>(`/boards/${responseTask.data[0].boardId}`);
      console.log(
        `Вам была добавлена таска ${responseTask.data[0].title} юзером ${responseUser.data.login} в доске ${responseBoard.data.title}`
      );
    }
  }
};

function App() {
  const location = useLocation();
  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket is connected');
    });

    socket.on('disconnect', () => {
      console.log('socket is disconnected');
    });

    socket.on('boards', (data) => {
      // console.log('location', location);
      // console.log('socket boards', data);
    });
    socket.on('columns', (data) => {
      // console.log('location', location);
      // console.log('socket columns', data);
    });
    socket.on('tasks', (data: ISocketResponse) => {
      console.log('location', location);
      console.log('socket tasks', data);
      cbShow('tasks', data);
    });
    socket.on('users', (data) => {
      // console.log('location', location);
      // console.log('socket users', data);
    });
    socket.on('files', (data) => {
      // console.log('location', location);
      // console.log('socket files', data);
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
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
