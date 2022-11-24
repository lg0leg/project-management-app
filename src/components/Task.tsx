import { FC, MouseEvent } from 'react';
import NotFoundImage from '../assets/images/NotFound.jpg';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { IFile, ITask } from 'models/dbTypes';
import { Draggable } from '@hello-pangea/dnd';
import { ModalTypes } from 'constants/modalTypes';
import { useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';

const filesListMocks: IFile[] = [
  {
    _id: 'File id',
    name: 'example.img',
    taskId: 'E6D624FD-0159-0C1E-AC4A-4A54438634CB',
    boardId: 'id of board',
    path: NotFoundImage,
  },
];

interface ITaskProps {
  task: ITask;
  index: number;
  openModal: (
    event: MouseEvent<HTMLButtonElement>,
    modalType: string,
    modalTargetId?: string,
    modalTargetType?: string
  ) => void;
}

export const Task: FC<ITaskProps> = ({ task, index, openModal }: ITaskProps) => {
  const { lang } = useAppSelector((state) => state.langReducer);
  const { users } = useAppSelector((state) => state.userReducer);
  const author = users.filter((user) => user._id === task.userId)[0];
  const assigned = task.users.map((taskUser) => users.filter((user) => user.login === taskUser)[0]);

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className="my-2 flex max-w-[21rem] cursor-move flex-col rounded-lg bg-white p-5 shadow last:mb-0"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex items-center justify-between pb-4">
            <h3 className="truncate text-base font-semibold text-gray-900">{task.title}</h3>
            <div className="ml-2 flex flex-row">
              <button
                className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200"
                onClick={(e) => {
                  openModal(e, ModalTypes.EDIT, task._id, 'task');
                }}
              >
                <BiEdit className="h-5 w-5" />
              </button>
              <button
                className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200"
                onClick={(e) => {
                  openModal(
                    e,
                    ModalTypes.DELETE,
                    task._id,
                    lang === LangKey.EN ? 'task' : 'задачу'
                  );
                }}
              >
                <BiTrash className="h-5 w-5" />
              </button>
            </div>
          </div>
          {filesListMocks[0].taskId === task._id ? (
            <div className="flex items-center justify-center pb-4">
              {/* <img className="rounded-lg bg-contain" src={NotFoundImage} alt="img" /> */}
              <img
                className="rounded-lg bg-contain"
                src={filesListMocks[0].path}
                alt={filesListMocks[0].name}
              />
            </div>
          ) : null}
          <div className="flex flex-col">
            <p className="pb-4 text-sm font-normal text-gray-700">{task.description}</p>
            <div className="flex flex-row items-center justify-between">
              {/* {author && (
                <div>
                  <p>Author: {author.login}</p>
                  <div className="relative inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      {author.login.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              )} */}
              <div></div>
              {assigned.length > 0 && (
                <div>
                  {/* <p>Assigned: </p> */}
                  <div className={assigned.length > 1 ? 'flex -space-x-3' : ''}>
                    {assigned.map((user, index) => {
                      if (index >= 3) return;
                      return (
                        <div
                          key={user._id}
                          className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-300"
                        >
                          <span className="text-sm font-medium text-gray-600">
                            {user.login.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      );
                    })}
                    {assigned.length > 3 && (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-700 text-xs font-medium text-white hover:bg-gray-600">
                        <span>+{assigned.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default Task;
