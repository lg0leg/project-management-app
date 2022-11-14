import React from 'react';

export default function CreateBoardPopup(props: {
  popupVisible: boolean;
  setPopupVisible: (arg: boolean) => void;
}) {
  const str =
    props.popupVisible == true
      ? 'fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-black/20'
      : 'hidden';

  return (
    <div className={str} onClick={() => props.setPopupVisible(false)}>
      <div
        className="h-[400px] w-[280px] rounded-xl bg-white sm:h-[500px] sm:w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        Create new board
      </div>
    </div>
  );
}
