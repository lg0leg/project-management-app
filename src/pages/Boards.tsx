import { fetchGetBoards, fetchDeleteBoard } from 'app/actionCreators/boardActionCreator';
import { fetchGetUsers } from 'app/actionCreators/userActionCreator';
import { IBoard, IUser } from 'models/dbTypes';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import React, { FC, useEffect, useState } from 'react';
import { isExpired } from 'react-jwt';
import { logout } from 'app/actionCreators/authActionCreators';
import { useNavigate } from 'react-router-dom';
import { CiGrid41, CiGrid2V } from 'react-icons/ci';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { BiTrash } from 'react-icons/bi';
import DeleteConformation from 'components/DeleteConformation';
import Popup from 'components/popup/popup';
import { getBoardText } from 'utils/getBoardText';
import SimpleSpinner from 'components/spinners/SimpleSpinner';
// import { BiEdit } from 'react-icons/bi';
// import { BiTask } from 'react-icons/bi';

export const Boards: FC = () => {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { boards, isLoading: isLoadingBoards } = useAppSelector((state) => state.boardReducer);
  const { users, isLoading: isLoadingUsers } = useAppSelector((state) => state.userReducer);
  const { token } = useAppSelector((state) => state.authReducer);
  const isLoading = isLoadingBoards || isLoadingUsers;
  const { lang } = useAppSelector((state) => state.langReducer);
  const [grid, setGrid] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentBoardId, setCurrentBoard] = useState('');

  useEffect(() => {
    if (isExpired(token)) {
      dispatch(logout(navigate));
    }
  });
  useEffect(() => {
    if (isExpired(token)) {
      dispatch(logout(navigate));
    } else {
      dispatch(fetchGetUsers(navigate));
      dispatch(fetchGetBoards({ navigate }));
    }
  }, []);

  const getLogin = (users: IUser[], id: string) => {
    const res = users.find((user) => user._id === id);
    return res ? res.login : '-';
  };

  useEffect(() => {
    const gridLS = localStorage.getItem('gridLS');
    if (gridLS) {
      setGrid(JSON.parse(gridLS));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gridLS', JSON.stringify(grid));
  }, [grid]);

  const gridButtonStyle = grid == 'grid' ? 'rgb(59, 130, 246, 1)' : 'rgb(0, 0, 0, 0.5)';
  const listButtonStyle = grid == 'grid' ? 'rgb(0, 0, 0, 0.5)' : 'rgb(59, 130, 246, 1)';

  const onConfirm = () => {
    dispatch(fetchDeleteBoard({ _id: currentBoardId, navigate }));
    setPopupVisible(false);
  };

  const onCancel = () => {
    setPopupVisible(false);
  };

  const filterBoards = (item: IBoard, searchStr: string) => {
    const { title, description } = getBoardText(item.title);
    return title.toLowerCase().includes(searchStr) || description.toLowerCase().includes(searchStr);
  };

  const returnFilteredBoards = (grid: string) =>
    (searchQuery == '' ? boards : boards.filter((item) => filterBoards(item, searchQuery))).map(
      (item) => {
        const { title, description } = getBoardText(item.title);
        const props = {
          title: title,
          description: description,
          id: item._id,
          setPopupVisible: setPopupVisible,
          setCurrentBoard: setCurrentBoard,
          key: item._id,
        };
        return grid === 'grid' ? <BoardsCardGrid {...props} /> : <BoardsCardList {...props} />;
      }
    );

  return (
    <>
      <section className="min-h-[calc(100vh-100px-80px)] bg-gray-50 ">
        <div className="flex h-[50px] w-full items-center justify-between gap-[20px] px-[20px] sm:h-[70px] md:px-[100px] lg:px-[200px]">
          <h2 className="relative text-2xl font-semibold text-gray-600 sm:text-3xl">
            {lang == 'en' ? 'Boards' : 'Доски'}
            <div className="absolute right-[-30px] bottom-[3px]">
              <SimpleSpinner isLoading={isLoading} sizePx={25} color={'gray'} />
            </div>
          </h2>
          <div className="flex gap-[20px]">
            <input
              className="w-[100px] rounded border-2 border-gray-200 bg-gray-50 pl-[5px] text-gray-500 focus:border-blue-400 focus:outline-none sm:w-[200px]"
              type="search"
              name="search"
              placeholder={lang == 'en' ? 'Search' : 'Поиск'}
              value={searchQuery}
              onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(value.toLowerCase());
              }}
            />
            <div className="flex gap-[5px]">
              <button className="hover:scale-105 active:scale-95" onClick={() => setGrid('grid')}>
                <CiGrid41 size={25} color={gridButtonStyle} />
              </button>
              <button
                className="rotate-90 hover:scale-105 active:scale-95"
                onClick={() => setGrid('list')}
              >
                <CiGrid2V size={25} color={listButtonStyle} />
              </button>
            </div>
          </div>
        </div>
        {grid == 'grid' ? (
          <div className="flex flex-wrap justify-center gap-[30px] px-[20px] pb-[20px]">
            {returnFilteredBoards(grid)}
          </div>
        ) : (
          <div className="grid gap-[20px] px-[30px] pb-[20px]">{returnFilteredBoards(grid)}</div>
        )}

        <Popup popupVisible={popupVisible} setPopupVisible={setPopupVisible}>
          <DeleteConformation
            type={lang == 'en' ? 'board' : 'эту доску'}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        </Popup>
      </section>
    </>
  );
};

function BoardsCardGrid(props: {
  title: string;
  description: string;
  id: string;
  setPopupVisible: (arg: boolean) => void;
  setCurrentBoard: (arg: string) => void;
}) {
  const navigate = useNavigate();

  return (
    <article
      className="relative h-[200px] w-[300px] cursor-pointer rounded-lg bg-white p-[20px] text-center shadow hover:shadow-blue-500/100"
      onClick={() => {
        const path = `board/${props.id}`;
        navigate(path);
      }}
    >
      <div className="flex items-center gap-[5px]">
        <HiOutlineClipboardList size={35} color="rgb(59, 130, 246, 1)" />
        <h3 className="max-w-[210px] truncate text-xl font-semibold text-gray-700">
          {props.title}
        </h3>
      </div>
      <button
        className="absolute top-[20px] right-[20px] hover:scale-105 active:scale-95"
        onClick={(e) => {
          e.stopPropagation();
          props.setCurrentBoard(props.id);
          props.setPopupVisible(true);
        }}
      >
        <BiTrash size={20} color="rgb(107, 114, 128, 1)" />
      </button>
      <textarea
        className="text-md mt-[15px] h-[110px] w-full cursor-pointer resize-none overflow-hidden rounded-md border border-slate-100 p-2 text-gray-500 focus:outline-none"
        value={props.description}
        readOnly
      />
    </article>
  );
}

function BoardsCardList(props: {
  title: string;
  description: string;
  id: string;
  setPopupVisible: (arg: boolean) => void;
  setCurrentBoard: (arg: string) => void;
}) {
  const navigate = useNavigate();

  return (
    <article
      className="relative grid h-[100px] w-full cursor-pointer grid-cols-[50px_1fr] items-center rounded-lg bg-white p-[10px] shadow hover:shadow-blue-500/100 sm:grid-cols-[50px_1fr_6fr] sm:p-[20px] sm:pr-[50px]"
      onClick={() => {
        const path = `board/${props.id}`;
        navigate(path);
      }}
    >
      <HiOutlineClipboardList size={35} color="rgb(59, 130, 246, 1)" />

      <h3 className="truncate text-xl font-semibold text-gray-700">{props.title}</h3>

      <textarea
        className="text-md col-span-2 h-[40px] cursor-pointer resize-none overflow-hidden rounded-md border border-slate-100 p-2 text-gray-500 focus:outline-none sm:col-auto sm:h-[60px]"
        value={props.description}
        readOnly
      />

      <button
        className="absolute top-[15px] right-[20px] hover:scale-105 active:scale-95 sm:top-[40px]"
        onClick={(e) => {
          e.stopPropagation();
          props.setCurrentBoard(props.id);
          props.setPopupVisible(true);
        }}
      >
        <BiTrash size={20} color="rgb(107, 114, 128, 1)" />
      </button>
    </article>
  );
}
