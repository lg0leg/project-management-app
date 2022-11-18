import { fetchCreateBoard, fetchGetBoards } from 'app/actionCreators/boardActionCreator';
import { fetchGetUser } from 'app/actionCreators/userActionCreator';
import { useAppDispatch, useAppSelector, useAppNavigate } from 'app/hooks';
import React, { useState } from 'react';
import { decodeToken } from 'react-jwt';
import type { IToken } from 'models/typescript';
import { IUser } from 'models/dbTypes';

export default function CreateBoardPopup(props: {
  popupVisible: boolean;
  setPopupVisible: (arg: boolean) => void;
}) {
  const { lang } = useAppSelector((state) => state.langReducer);
  const { token } = useAppSelector((state) => state.authReducer);
  const { isLoading: isLoadingBoard } = useAppSelector((state) => state.boardReducer);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const hidePopup = () => {
    setTitle('');
    setDescription('');
    props.setPopupVisible(false);
  };

  const createBoard = () => {
    const getBoards = () => {
      dispatch(fetchGetBoards({ cb: hidePopup, navigate }));
    };
    const { id } = decodeToken(token) as IToken;
    dispatch(fetchCreateBoard({ title, owner: id, cb: getBoards, navigate }));
  };

  const overlayStylesBase =
    'fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-black/20';

  const overlayStylesCurrent =
    props.popupVisible == true
      ? ' opacity-100 duration-500 pointer-events-auto visible'
      : 'opacity-0 duration-500 pointer-events-none invisible';

  const popupStylesBase =
    'flex h-[400px] w-[280px] flex-col items-center justify-between rounded-xl bg-white p-[20px] sm:h-[500px] sm:w-[400px] sm:pt-[40px] ';

  const popupStylesCurrent =
    props.popupVisible == true
      ? 'scale-100 pointer-events-auto visible duration-500'
      : 'scale-50  pointer-events-none invisible';

  return (
    <div
      className={overlayStylesBase + overlayStylesCurrent}
      onClick={() => props.setPopupVisible(false)}
    >
      <div className={popupStylesBase + popupStylesCurrent} onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl font-medium text-blue-700">
          {lang == 'en' ? 'Create board' : 'Создать доску'}
        </h2>

        <div className="w-[90%]">
          <label
            htmlFor="title-input"
            className="mb-2 block text-lg font-medium text-blue-700  sm:text-xl"
          >
            {lang == 'en' ? 'Title' : 'Название'}
          </label>
          <input
            type="text"
            id="title-input"
            maxLength={20}
            className="block h-[40px] w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-base text-blue-900 focus:border-blue-600 focus:bg-white focus:outline-none sm:h-[50px] sm:text-lg"
            value={title}
            onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(value);
            }}
          />
        </div>

        <div className="w-[90%]">
          <label
            htmlFor="description-input"
            className="mb-2 block text-lg font-medium text-blue-700  sm:text-xl"
          >
            {lang == 'en' ? 'Description' : 'Описание'}
          </label>
          <textarea
            id="description-input"
            className="block h-[100px] w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm text-blue-900 focus:border-blue-600 focus:bg-white focus:outline-none sm:h-[160px] sm:text-base"
            value={description}
            onChange={({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(value);
            }}
          />
        </div>

        <div className="flex w-full justify-center gap-[10px] sm:gap-[30px]">
          <button
            className="rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white sm:px-8"
            onClick={hidePopup}
          >
            <span className=" text-lg">{lang == 'en' ? 'Cancel' : 'Отмена'}</span>
          </button>
          <button
            className="rounded border border-blue-700 bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 sm:px-8"
            onClick={createBoard}
          >
            <span className=" text-lg">{lang == 'en' ? 'Create' : 'Создать'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
