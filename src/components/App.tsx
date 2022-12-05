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
import { loginReload } from 'app/actionCreators/authActionCreators';
import { StorageKey } from 'constants/storageKey';
const socket = io(BASE_URL);

function App() {
  const { lang } = useAppSelector((state) => state.langReducer);
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();

  const infoNotify = ({ type, task, board, column }: IInfoNotify) => {
    switch (type) {
      case NotifyTipe.ADD_BOARD:
        toast.info(lang === LangKey.EN ? `"${board}" board added` : `Добавлена доска "${board}"`);
        break;
      case NotifyTipe.DELETE_BOARD:
        toast.info(lang === LangKey.EN ? `"${board}" board deleted` : `Удалена доска "${board}"`);
        break;
      case NotifyTipe.DELETE_BOARD_INNER:
        toast.warn(
          lang === LangKey.EN
            ? `Sorry, this board has been deleted`
            : `Простите, эта доска уже удалена`
        );
        break;
      case NotifyTipe.ADD_COLUMN:
        toast.info(
          lang === LangKey.EN
            ? `"${column}" column added in the board "${board}"`
            : `Добавлена колонка "${column}" в доске "${board}"`
        );
        break;
      case NotifyTipe.UPDATE_COLUMN:
        toast.info(
          lang === LangKey.EN
            ? `"${column}" column updated in the board "${board}"`
            : `Обновлена колонка "${column}" в доске "${board}"`
        );

        break;
      case NotifyTipe.ADD_TASK:
        toast.info(
          lang === LangKey.EN
            ? `"${task}" task added in the board "${board}"`
            : `Добавлена задача "${task}" в доске "${board}"`
        );
        break;
      case NotifyTipe.UPDATE_TASK:
        toast.info(
          lang === LangKey.EN
            ? `"${task}" task updated in the board "${board}"`
            : `Обновлена задача "${task}" в доске "${board}"`
        );
        break;
    }
  };

  useEffect(() => {
    const isNotifyShow = () => {
      const path = window.location.pathname;
      return isAuth && (path === RoutesPath.BOARDS || path.startsWith('/board/'));
    };
    socket.on('connect', () => {
      if (!isNotifyShow()) return;
      toast.info('socket is connected');
      if (window.location.pathname === RoutesPath.BOARDS) {
        dispatch(fetchGetBoards({ navigate }));
      }
      if (window.location.pathname.startsWith('/board/')) {
        dispatch(fetchGetAllBoardStore({ navigate, _id: window.location.pathname.slice(7) }));
      }
    });

    socket.on('disconnect', () => {
      if (!isNotifyShow()) return;
      toast.error('socket is disconnected');
    });

    socket.on('boards', (data: ISocketResponse) => {
      if (isNotifyShow()) dispatch(webSocketBoards({ navigate, data, showNotify: infoNotify }));
    });
    socket.on('columns', (data: ISocketResponse) => {
      if (isNotifyShow()) dispatch(webSocketColumns({ data, showNotify: infoNotify, navigate }));
    });
    socket.on('tasks', (data: ISocketResponse) => {
      if (isNotifyShow()) dispatch(webSocketTasks({ data, showNotify: infoNotify, navigate }));
    });
    socket.on('points', (data: ISocketResponse) => {
      if (isNotifyShow()) dispatch(webSocketPoints({ data, showNotify: infoNotify, navigate }));
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

  useEffect(() => {
    const handlerChangeStorage = (e: StorageEvent) => {
      if (e.key === StorageKey.TOKEN) dispatch(loginReload(navigate));
    };
    window.addEventListener('storage', handlerChangeStorage);
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        limit={10}
        transition={Zoom}
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
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
