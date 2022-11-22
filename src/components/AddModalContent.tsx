import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import { FC, ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiXMark } from 'react-icons/hi2';
import { Button } from './Button';
import { fetchCreateColumn } from 'app/actionCreators/columnActionCreator';
import { useParams } from 'react-router-dom';
import { fetchCreateTask } from 'app/actionCreators/taskActionCreator';
import { IColumn, ITask } from 'models/dbTypes';

interface IAddModalContentProps {
  type: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

export const AddModalContent: FC<IAddModalContentProps> = ({ type, onConfirm, onCancel }) => {
  const { lang } = useAppSelector((state) => state.langReducer);
  const { columns } = useAppSelector((state) => state.columnReducer);
  const { tasks } = useAppSelector((state) => state.taskReducer);
  const { users } = useAppSelector((state) => state.userReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const _id = id ?? '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask, IColumn>();

  const onSubmit: SubmitHandler<ITask | IColumn> = (data) => {
    console.log('submited: ', data);
    console.log('type: ', type);
    const { title } = data;
    onConfirm();
    // if (type === 'column') {
    //   dispatch(fetchCreateColumn({ boardId: _id, title, order: columns.length, navigate }));
    // }
    // if (type === 'task') {
    //   const initUsers: string[] = [];
    //   const taskData = {
    //     title,
    //     description: 'some description',
    //     order: tasks.filter((task) => task.columnId === columnId).length,
    //     userId: +user._id,
    //     users: initUsers,
    //   };
    //   const column_Id = columnId ?? '';
    //   dispatch(fetchCreateTask({ boardId: _id, columnId: column_Id, task: taskData, navigate }));
    // }

    onCancel();
    // const { login, password } = data;
    // dispatch(fetchLogin({ login, password, navigate }));
  };

  return (
    <>
      <div className="w-[400px] overflow-y-auto overflow-x-hidden p-4">
        <div className="relative h-full w-full max-w-md md:h-auto">
          <div className="relative rounded-lg bg-white shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => onCancel()}
            >
              <div className="h-5 w-5">
                <HiXMark size={20} />
              </div>
              <span className="sr-only">{lang === LangKey.EN ? 'Close' : 'Закрыть'}</span>
            </button>
            <div className="py-6 px-6 ">
              <h3 className="mb-4 text-xl font-medium text-gray-900">Create new {type}</h3>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="Text" className="mb-2 block text-sm font-medium text-gray-900">
                    {type.charAt(0).toUpperCase() + type.slice(1)} title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Title..."
                    {...register('title', { required: true, minLength: 2, maxLength: 30 })}
                    // required
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600">
                      <span className="font-medium">Oh, snapp!</span> Type title beetwen 2 and 30
                      characters.
                    </p>
                  )}
                </div>
                {type === 'task' && (
                  <>
                    <div>
                      <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Description..."
                        {...register('description', { maxLength: 100 })}
                        // required
                      />
                      {errors.description && (
                        <p className="mt-2 text-sm text-red-600">
                          <span className="font-medium">Oh, snapp!</span> Max length is 100
                          characters.
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="users"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Assignee user
                      </label>
                      <select
                        id="users"
                        className="block h-48 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        {...register('users')}
                        multiple
                      >
                        {/* <option value="" hidden>
                          Assign user...
                        </option> */}
                        <option value="">None</option>
                        {users.map((user) => {
                          return (
                            <option key={user._id} value={user.login}>
                              {user.login} {user.name ? '(' + user.name + ')' : null}
                            </option>
                          );
                        })}
                      </select>
                      {errors.users && (
                        <p className="mt-2 text-sm text-red-600">
                          <span className="font-medium">Oh, snapp!</span> Some error happens.
                        </p>
                      )}
                    </div>
                  </>
                )}
                <div className="flex items-center justify-center">
                  <Button type="submit">{lang === LangKey.EN ? 'Create' : 'Создать'}</Button>
                  <Button
                    color="alternative"
                    onClick={() => {
                      onCancel();
                    }}
                  >
                    {lang === LangKey.EN ? 'Cancel' : 'Отмена'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddModalContent;
