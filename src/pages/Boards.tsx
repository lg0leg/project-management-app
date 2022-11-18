import { fetchGetBoards } from 'app/actionCreators/boardActionCreator';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import React, { FC, useEffect } from 'react';

export const Boards: FC = () => {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { boards, isError, isLoading } = useAppSelector((state) => state.boardReducer);
  useEffect(() => {
    dispatch(fetchGetBoards({ navigate }));
  }, []);
  console.log(boards);

  return (
    <>
      <h2>Boards Page</h2>
    </>
  );
};

export default Boards;
