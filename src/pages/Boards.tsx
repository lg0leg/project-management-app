import { fetchGetBoards, fetchDeleteBoard } from 'app/actionCreators/boardActionCreator';
import { fetchGetUsers } from 'app/actionCreators/userActionCreator';
import { IBoard, IUser } from 'models/dbTypes';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import React, { FC, useEffect } from 'react';

export const Boards: FC = () => {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { boards, isLoading: isLoadingBoards } = useAppSelector((state) => state.boardReducer);
  const { users, isLoading: isLoadingUsers } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(fetchGetUsers(navigate));
    dispatch(fetchGetBoards({ navigate }));
  }, []);

  const deleteBoard = (_id: string) => {
    dispatch(fetchDeleteBoard({ _id, navigate }));
  };

  const getLogin = (users: IUser[], id: string) => {
    const res = users.find((user) => user._id === id);
    console.log(res);
    return res ? res.login : '-';
  };
  return (
    <>
      <h2>Boards Page</h2>
      <div className="flex gap-2">
        {boards.map(({ title: titleJSON, owner: ownerId, users: usersId, _id: boardId }) => {
          const { title, description } = JSON.parse(titleJSON);
          const owner = getLogin(users, ownerId);
          const usersString = usersId
            .map((userId) => getLogin(users, userId))
            .filter((login) => login !== '-')
            .join(', ');
          return (
            <div key={boardId} className="w-[400px] border-2">
              <button className="w-[100px] bg-red-300 py-2" onClick={() => deleteBoard(boardId)}>
                delete
              </button>
              <h2>title: {title}</h2>
              <div>description: {description}</div>
              <div>owner: {owner}</div>
              <div>users: {usersString}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Boards;
