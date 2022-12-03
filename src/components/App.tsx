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
import { ISocketResponse, IInfoNotify } from 'models/typescript';
import { NotifyTipe } from 'constants/notifyType';
import { LangKey } from 'constants/lang';
const socket = io(BASE_URL);

function App() {
  const { lang } = useAppSelector((state) => state.langReducer);
  const infoNotify = ({ type, task, board, column }: IInfoNotify) => {
    switch (type) {
      case NotifyTipe.ADD_BOARD:
        toast.info(lang === LangKey.EN ? `Add Board ${board}` : `Добавлена доска ${board}`);
        break;
      case NotifyTipe.DELETE_BOARD:
        toast.info(lang === LangKey.EN ? `Delete board ${board}` : `Удалена доска ${board}`);
        break;
      case NotifyTipe.DELETE_BOARD_INNER:
        toast.warn(
          lang === LangKey.EN
            ? `Sorry this board has been deleted`
            : `Простите эта доска уже удалена`
        );
        break;
      case NotifyTipe.ADD_COLUMN:
        toast.info(
          lang === LangKey.EN
            ? `Add column ${column} in the board ${board}`
            : `Добавлена колонка ${column} в доске ${board}`
        );
        break;
      case NotifyTipe.UPDATE_COLUMN:
        toast.info(
          lang === LangKey.EN
            ? `Update column ${column} in the board ${board}`
            : `Обновлена колонка ${column} в доске ${board}`
        );

        break;
      case NotifyTipe.DELETE_COLUMN:
        toast.info(
          lang === LangKey.EN
            ? `Delete column ${column} in the board ${board}`
            : `Удалена колонка ${column} в доске ${board}`
        );
        break;
      case NotifyTipe.ADD_TASK:
        toast.info(
          lang === LangKey.EN
            ? `Add task ${task} in the board ${board}`
            : `Добавлена задача ${task} в доске ${board}`
        );
        break;
      case NotifyTipe.UPDATE_TASK:
        toast.info(
          lang === LangKey.EN
            ? `Update task ${task} in the board ${board}`
            : `Обновлена задача ${task} в доске ${board}`
        );
        break;
      case NotifyTipe.DELETE_TASK:
        toast.info(
          lang === LangKey.EN
            ? `Delete task ${task} in the board ${board}`
            : `Удалена задача ${task} в доске ${board}`
        );
        break;
    }
  };
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on('connect', () => {
      toast.info('socket is connected');
      if (!isAuth) return;
      if (window.location.pathname === RoutesPath.BOARDS) {
        dispatch(fetchGetBoards({ navigate }));
      }
      if (window.location.pathname.startsWith('/board/')) {
        dispatch(fetchGetAllBoardStore({ navigate, _id: window.location.pathname.slice(7) }));
      }
    });

    socket.on('disconnect', () => {
      toast.error('socket is disconnected');
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
  }, [isAuth, lang]);

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
