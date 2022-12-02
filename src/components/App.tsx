import React, { useEffect } from 'react';
import { Main } from '../components/Main';
import Footer from './Footer';
import Header from './Header';
import io from 'socket.io-client';
import { RoutesPath } from 'constants/routes';
import { BASE_URL } from 'constants/baseUrl';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import {
  fetchGetAllBoardStore,
  fetchGetBoards,
  webSocketBoards,
} from 'app/actionCreators/boardActionCreator';
import { webSocketColumns } from 'app/actionCreators/columnActionCreator';
import { webSocketTasks } from 'app/actionCreators/taskActionCreator';
import { webSocketPoints } from 'app/actionCreators/pointActionCreator';
import { ISocketResponse } from 'models/typescript';
import NewHeader from './NewHeader';
const socket = io(BASE_URL);

function App() {
  const infoNotify = (text: string) => toast.info(text);
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on('connect', () => {
      infoNotify('socket is connected');
      if (!isAuth) return;
      if (window.location.pathname === RoutesPath.BOARDS) {
        dispatch(fetchGetBoards({ navigate }));
      }
      if (window.location.pathname.startsWith('/board/')) {
        dispatch(fetchGetAllBoardStore({ navigate, _id: window.location.pathname.slice(7) }));
      }
    });

    socket.on('disconnect', () => {
      infoNotify('socket is disconnected');
    });

    socket.on('boards', (data: ISocketResponse) => {
      if (isAuth) dispatch(webSocketBoards({ navigate, data, showNotify: infoNotify }));
    });
    socket.on('columns', (data: ISocketResponse) => {
      if (isAuth) dispatch(webSocketColumns({ data, showNotify: infoNotify, navigate }));
    });
    socket.on('tasks', (data: ISocketResponse) => {
      if (isAuth) dispatch(webSocketTasks({ data, showNotify: infoNotify, navigate }));
    });
    socket.on('points', (data: ISocketResponse) => {
      if (isAuth) dispatch(webSocketPoints({ data, showNotify: infoNotify, navigate }));
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('boards');
      socket.off('columns');
      socket.off('tasks');
      socket.off('points');
    };
  }, [isAuth]);

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
      <NewHeader />
      <Main />
      <Footer />
    </>
  );
}

export default App;
