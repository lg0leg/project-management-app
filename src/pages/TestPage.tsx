import { logout } from 'app/actionCreators/authActionCreators';
import {
  fetchDeleteUser,
  fetchGetUser,
  fetchGetUsers,
  fetchUpdateUser,
} from 'app/actionCreators/userActionCreator';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { SignUpForm } from 'components/FormTest';
import Input from 'components/Input';
import Spinner from 'components/Spinner';
import { LangKey } from 'constants/lang';
import type { IToken } from 'models/typescript';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { isExpired, decodeToken } from 'react-jwt';
interface IUserInput {
  name: string;
  login: string;
  password: string;
}

export default function TestPage() {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IUserInput>();
  const { user, users, isLoading, isError, httpCode } = useAppSelector(
    (state) => state.userReducer
  );
  const { lang } = useAppSelector((state) => state.langReducer);
  const { _id } = user;
  let errorText = '';
  if (httpCode === 409) {
    errorText = lang === LangKey.EN ? 'This login already exists' : 'Такой логин уже существует';
  }

  //такую проверку добавить на boards, board, и welcome page
  const { token } = useAppSelector((state) => state.authReducer);
  useEffect(() => {
    if (isExpired(token)) {
      dispatch(logout(navigate));
    }
  });
  //--------------------------------------------------------
  useEffect(() => {
    if (isExpired(token)) {
      dispatch(logout(navigate));
    } else {
      const { id: _id } = decodeToken(token) as IToken;
      dispatch(fetchGetUser({ _id, navigate }));
    }
  }, [token]);

  const getUsers = () => {
    dispatch(fetchGetUsers(navigate));
  };

  const getUser = () => {
    dispatch(fetchGetUser({ _id: user._id, navigate }));
  };

  const updateUser: SubmitHandler<IUserInput> = (data) => {
    console.log(data);
    const newLogin = data.login || user.login;
    const newName = data.name || user.name;
    dispatch(
      fetchUpdateUser({ _id, login: newLogin, name: newName, password: data.password, navigate })
    );
  };

  const deleteUser = () => {
    dispatch(fetchDeleteUser({ _id, navigate }));
  };

  return (
    // <Input id="test" label="test" name="test" />
    <SignUpForm />

    // <div className="w-full border-2">
    //   <h2 className="ml-auto mr-auto">userReduser</h2>
    //   {isLoading && <Spinner />}
    //   {isError && <p className="text-[20px] font-semibold text-red-500">{errorText}</p>}
    //   <div className="mb-4 flex">
    //     <h2>get users</h2>
    //     <button className="w-[100px] bg-blue-500" onClick={getUsers}>
    //       get users
    //     </button>
    //     <div className="max-h-[400]">
    //       {users.map((item) => {
    //         return (
    //           <div key={`${item._id}`}>
    //             <hr />
    //             <p>{item.name}</p>
    //             <p>{item.login}</p>
    //             <p>{item._id}</p>
    //             <hr />
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    //   <hr />
    //   <div className="mb-4 flex">
    //     <h2>get user</h2>
    //     <button className="w-[100px] bg-blue-500" onClick={getUser}>
    //       get user
    //     </button>
    //     <div>
    //       <p>{user.name}</p>
    //       <p>{user.login}</p>
    //       <p>{user._id}</p>
    //     </div>
    //   </div>
    //   <hr />
    //   <form className="mb-4 flex flex-col" onSubmit={handleSubmit(updateUser)}>
    //     <h2>update user</h2>
    //     <button className="w-[100px] bg-blue-500" onClick={getUser}>
    //       update user
    //     </button>
    //     <span className="flex flex-col">id:{user._id}</span>
    //     <label className="flex flex-col">
    //       <span>username:{user.name}, enter new name:</span>
    //       <input type="text" className="w-[200px] border-2" {...register('name')} />
    //     </label>
    //     <label>
    //       <span className="flex flex-col">login:{user.login}, enter new login:</span>
    //       <input type="text" className="w-[200px] border-2" {...register('login')} />
    //     </label>
    //     <label>
    //       <span className="flex flex-col">enter new password:</span>
    //       <input type="password" className="w-[200px] border-2" {...register('password')} />
    //     </label>
    //   </form>
    //   <hr />
    //   <div className="flex">
    //     <h2>delete user</h2>
    //     <button className="w-[100px] bg-blue-500" onClick={deleteUser}>
    //       delete user
    //     </button>
    //   </div>
    // </div>
  );
}

// ----------------------------------Board Page---------------------------------------
// import React, { FC, useState, useEffect } from 'react';
// import { Navigate, useParams } from 'react-router-dom';
// import { Column } from 'components/Column';
// import { IBoard, IColumn, ITask, IUser } from 'models/dbTypes';
// import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
// import { fetchGetAllBoardStore } from 'app/actionCreators/boardActionCreator';
// import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
// import { isExpired } from 'react-jwt';
// import { logout } from 'app/actionCreators/authActionCreators';
// import Spinner from 'components/Spinner';
// import { fetchGetUsers } from 'app/actionCreators/userActionCreator';
// import { RoutesPath } from 'constants/routes';

// export const Board: FC = () => {
//   const { id } = useParams();
//   const _id = id ?? '';
//   const navigate = useAppNavigate();
//   const dispatch = useAppDispatch();
//   const { board, isLoading: isLoadingBoards } = useAppSelector((state) => state.boardReducer);
//   const { columns, isLoading: isLoadingColumns } = useAppSelector((state) => state.columnReducer);
//   const { tasks, isLoading: isLoadingTasks } = useAppSelector((state) => state.taskReducer);
//   const { users, isLoading: isLoadingUsers } = useAppSelector((state) => state.userReducer);
//   const { token } = useAppSelector((state) => state.authReducer);
//   const isLoading = isLoadingBoards || isLoadingColumns || isLoadingTasks || isLoadingUsers;
//   useEffect(() => {
//     if (isExpired(token)) {
//       dispatch(logout(navigate));
//     }
//   });

//   useEffect(() => {
//     if (isExpired(token)) {
//       dispatch(logout(navigate));
//     } else {
//       dispatch(fetchGetUsers(navigate));
//       dispatch(fetchGetAllBoardStore({ _id, navigate }));
//     }
//   }, []);

//   const onDragEnd = (dropResult: DropResult) => {
//     const { source, destination, type, draggableId } = dropResult;

//     if (!destination) return;

//     if (destination.droppableId === source.droppableId && destination.index === source.index)
//       return;

//     if (type === 'TASK') {
//       const newtasks: ITask[] = tasks.map((task) => {
//         if (task._id !== draggableId) {
//           if (source.droppableId === destination.droppableId) {
//             if (
//               source.index > destination.index &&
//               task.order >= destination.index &&
//               task.order <= source.index
//             )
//               return { ...task, order: task.order + 1 };
//             if (
//               source.index < destination.index &&
//               task.order <= destination.index &&
//               task.order >= source.index
//             )
//               return { ...task, order: task.order - 1 };
//           }
//           if (task.columnId === destination!.droppableId && task.order >= destination!.index)
//             return { ...task, order: task.order + 1 };
//           if (task.columnId === source!.droppableId && task.order > source!.index)
//             return { ...task, order: task.order - 1 };
//           return task;
//         } else {
//           return { ...task, columnId: destination!.droppableId, order: destination!.index };
//         }
//       });
//       // setTasks(newtasks);
//     }
//     if (type === 'COLUMN') {
//       const draggedColumnId = draggableId.split('.')[1];
//       if (source.droppableId === destination.droppableId) {
//         const newColumns: IColumn[] = columns.map((column) => {
//           if (column._id !== draggedColumnId) {
//             if (
//               source.index > destination.index &&
//               column.order >= destination.index &&
//               column.order <= source.index
//             )
//               return { ...column, order: column.order + 1 };
//             if (
//               source.index < destination.index &&
//               column.order <= destination.index &&
//               column.order >= source.index
//             )
//               return { ...column, order: column.order - 1 };
//             return { ...column };
//           } else {
//             return { ...column, order: destination!.index };
//           }
//         });
//         // setColumns(newColumns);
//       }
//     }
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="flex max-h-[calc(100vh-100px-80px)] flex-col items-center justify-center bg-gray-50">
//         <h1 className="max-h-[70px] w-full px-5 pt-4 text-3xl font-semibold text-gray-900">
//           {board.title}
//         </h1>
//         <Droppable droppableId={'board.' + id} type={'COLUMN'} direction={'horizontal'}>
//           {(provided) => (
//             <div
//               className="scrollbar flex h-full w-full space-x-4 overflow-x-auto overflow-y-hidden p-4 text-gray-700"
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//             >
//               {columns
//                 .sort((col1, col2) => col1.order - col2.order)
//                 .map((column, index) => {
//                   return (
//                     <Column
//                       key={column._id}
//                       index={index}
//                       column={column}
//                       tasks={tasks.filter((task) => task.columnId === column._id)}
//                     />
//                   );
//                 })}
//               <div className="ml-4">{provided.placeholder}</div>
//             </div>
//           )}
//         </Droppable>
//       </div>
//     </DragDropContext>
//   );
// };

// export default Board;
