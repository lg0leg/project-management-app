import { FC, useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import type { ITask } from 'models/dbTypes';
import { Draggable } from '@hello-pangea/dnd';
import { ModalTypes } from 'constants/modalTypes';
import { useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import { Popover } from 'react-tiny-popover';
import { IOpenModalProps } from 'pages/Board';
import { Priority } from './Priority';

interface ITaskProps {
  task: ITask;
  index: number;
  openModal: ({ event, modalType, modalTargetId, modalTargetType }: IOpenModalProps) => void;
  hashMap: Map<string, boolean>;
}

export const Task: FC<ITaskProps> = ({ task, index, openModal, hashMap }: ITaskProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const colorsPerPrio = {
    none: 'bg-gray-600',
    low: 'bg-green-600',
    medium: 'bg-blue-600',
    high: 'bg-yellow-600',
    critical: 'bg-red-600',
  };

  const { lang } = useAppSelector((state) => state.langReducer);
  const { users } = useAppSelector((state) => state.userReducer);
  const { points } = useAppSelector((state) => state.pointReducer);
  const author = users.filter((user) => user._id === task.userId)[0];
  const assigned = task.users.map((taskUser) => users.filter((user) => user.login === taskUser)[0]);
  const priority = points.filter((point) => point.taskId === task._id);

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className="my-2 shadow last:mb-0"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="relative">
            {priority.length && hashMap.get(priority[0].title) === true && (
              <div
                className={`absolute -inset-0.5 rounded-lg ${
                  colorsPerPrio[priority[0].title]
                } opacity-75 blur-sm`}
              ></div>
            )}
            <div className="relative flex max-w-[21rem] cursor-move flex-col rounded-lg bg-white p-5">
              <div className="flex items-center justify-between pb-4">
                <h3 className="truncate text-base font-semibold text-gray-900">{task.title}</h3>
                <div className="ml-2 flex flex-row">
                  <button
                    className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200"
                    onClick={(event) => {
                      openModal({
                        event,
                        modalType: ModalTypes.EDIT,
                        modalTargetId: task._id,
                        modalTargetType: 'task',
                      });
                    }}
                  >
                    <BiEdit className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200"
                    onClick={(event) => {
                      openModal({
                        event,
                        modalType: ModalTypes.DELETE,
                        modalTargetId: task._id,
                        modalTargetType: lang === LangKey.EN ? 'task' : 'задачу',
                      });
                    }}
                  >
                    <BiTrash className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {/* {filesListMocks[0].taskId === task._id ? (
            <div className="flex items-center justify-center pb-4">
              <img
                className="rounded-lg bg-contain"
                src={filesListMocks[0].path}
                alt={filesListMocks[0].name}
              />
            </div>
          ) : null} */}
              <div className="flex flex-col">
                <p className="pb-4 text-sm font-normal text-gray-700">{task.description}</p>
                <div className="flex flex-row items-center justify-between pb-4">
                  {author && author.login && (
                    <div className="inline-flex items-center text-sm">
                      <p>Author:</p>
                      <Popover
                        isOpen={isPopoverOpen && author._id === selectedUser}
                        positions={['top', 'bottom', 'right', 'left']}
                        content={
                          <div className="min-w-16 mb-2 rounded-lg bg-gray-900 text-white shadow-sm">
                            <div className="flex flex-col items-center justify-center p-2">
                              <p className="text-sm font-semibold leading-none">{author.name}</p>
                              <p className="text-sm font-normal">{author.login}</p>
                            </div>
                          </div>
                        }
                      >
                        <div
                          className="relative ml-2 inline-flex h-7 w-7 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100"
                          onMouseEnter={() => {
                            setIsPopoverOpen((prev) => !prev);
                            setSelectedUser(author._id);
                          }}
                          onMouseLeave={() => {
                            setIsPopoverOpen((prev) => !prev);
                            setSelectedUser('');
                          }}
                        >
                          <span className="text-sm font-medium text-gray-600">
                            {author.login.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </Popover>
                    </div>
                  )}
                  <div></div>
                  {assigned.length > 0 && (
                    <div className={assigned.length > 1 ? 'flex -space-x-3' : ''}>
                      {assigned.map((user, index) => {
                        if (index >= 3) return;
                        if (user && user.login)
                          return (
                            <Popover
                              key={user._id}
                              isOpen={isPopoverOpen && user._id === selectedUser}
                              positions={['top', 'bottom', 'left', 'right']}
                              content={
                                <div className="min-w-16 mb-2 rounded-lg bg-gray-900 text-white shadow-sm">
                                  <div className="flex flex-col items-center justify-center p-2">
                                    <p className="text-sm font-semibold leading-none">
                                      {user.name}
                                    </p>
                                    <p className="text-sm font-normal">{user.login}</p>
                                  </div>
                                </div>
                              }
                            >
                              <div
                                className="inline-flex h-7 w-7 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-300"
                                onMouseEnter={() => {
                                  setIsPopoverOpen((prev) => !prev);
                                  setSelectedUser(user._id);
                                }}
                                onMouseLeave={() => {
                                  setIsPopoverOpen((prev) => !prev);
                                  setSelectedUser('');
                                }}
                              >
                                <span className="text-sm font-medium text-gray-600">
                                  {user.login.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </Popover>
                          );
                      })}
                      {assigned.length > 3 && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-700 text-xs font-medium text-white">
                          <span>+{assigned.length - 3}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {priority.length > 0 && (
                  <div className="flex flex-col items-center justify-between">
                    {priority.map((p) => {
                      return <Priority key={p._id} type={p.title} />;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default Task;
