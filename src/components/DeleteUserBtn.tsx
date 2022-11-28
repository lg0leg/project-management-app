import { fetchDeleteUser } from 'app/actionCreators/userActionCreator';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import React, { useState } from 'react';
import DeleteConformation from './DeleteConformation';
import Popup from './popup/popup';
interface IProps {
  text: string;
  _id: string;
}

export default function DeleteUserBtn({ text, _id }: IProps) {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const { lang } = useAppSelector((state) => state.langReducer);
  const type = lang === LangKey.EN ? 'user' : 'пользователя';
  const [modalOpen, setModalOpen] = useState(false);
  const onConfirm = () => {
    if (!_id) return;
    OnCancel();
    dispatch(fetchDeleteUser({ _id, navigate }));
  };
  const OnCancel = () => setModalOpen(false);
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        type="button"
        className="mt-5 w-full rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none "
      >
        {text}
      </button>
      <Popup popupVisible={modalOpen} setPopupVisible={setModalOpen}>
        <DeleteConformation type={type} onConfirm={onConfirm} onCancel={OnCancel} />
      </Popup>
    </>
  );
}
