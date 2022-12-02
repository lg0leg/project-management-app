import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import { FC, ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiXMark } from 'react-icons/hi2';
import { Button } from 'components/Button';
import type { IPoint, ITask } from 'models/dbTypes';
import { fetchUpdateTask } from 'app/actionCreators/taskActionCreator';
import { fetchAddFile } from 'app/actionCreators/fileActionCreator';
import { fetchChangePoint, fetchCreatePoint } from 'app/actionCreators/pointActionCreator';
import { toast } from 'react-toastify';

interface IEditTaskModalContentProps {
  task: ITask;
  priority: IPoint[];
  onCancel: () => void;
  children?: ReactNode;
}

interface IFormData extends ITask {
  attachment: FileList;
  priority: 'none' | 'low' | 'medium' | 'high' | 'critical';
}

export const EditTaskModalContent: FC<IEditTaskModalContentProps> = ({
  task,
  priority: points,
  onCancel,
}) => {
  const { lang } = useAppSelector((state) => state.langReducer);
  const { users } = useAppSelector((state) => state.userReducer);
  const { tasks } = useAppSelector((state) => state.taskReducer);
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const curTask = { ...task };
  const taskPoint = points.filter((point) => point.taskId === curTask._id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: { ...curTask, priority: taskPoint.length ? taskPoint[0].title : 'none' },
  });

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    const { title, description, order, userId, users, attachment, priority } = data;
    const taskData = {
      title,
      order,
      description,
      userId,
      users,
      columnId: curTask.columnId,
    };

    if (!tasks.find((task) => task._id === curTask._id)) {
      toast.error('Задача уже удалена');
      onCancel();
      return;
    }

    dispatch(
      fetchUpdateTask({
        _id: curTask._id,
        boardId: curTask.boardId,
        columnId: curTask.columnId,
        updateTask: taskData,
        navigate,
      })
    );
    // if (attachment.length) {
    //   Array.from(attachment).map((file) =>
    //     dispatch(fetchAddFile({ boardId: curTask.boardId, file, navigate, taskId: curTask._id }))
    //   );
    //   console.log('attachment');
    // }

    if (!taskPoint.length) {
      console.log('point 1');
      const newPoint = {
        taskId: curTask._id,
        boardId: curTask.boardId,
        title: priority,
        done: false,
      };
      console.log('point 2');
      //#TODO - заменить на patch по taskid фильтрованную
      dispatch(fetchCreatePoint({ navigate, point: newPoint }));
      console.log('point 3');
    }
    if (taskPoint.length) {
      const changePoint = { done: false, title: priority };
      dispatch(fetchChangePoint({ navigate, pointId: taskPoint[0]._id, pointData: changePoint }));
    }
    onCancel();
  };

  return (
    <div className="w-[600px] overflow-y-auto overflow-x-hidden p-4">
      <div className="h-full w-full">
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
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              {lang === LangKey.EN ? 'Create new task' : 'Добавить задание'}
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="Text" className="mb-2 block text-sm font-medium text-gray-900">
                  {lang === LangKey.EN ? 'Title' : 'Название'}
                </label>
                <input
                  type="text"
                  id="title"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder={`${lang === LangKey.EN ? 'Title' : 'Название'}...`}
                  {...register('title', { required: true, minLength: 2, maxLength: 50 })}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600">
                    {lang === LangKey.EN
                      ? 'Type title beetwen 2 and 50 characters'
                      : 'Длинна названия от 2 до 50 символов'}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {lang === LangKey.EN ? 'Description' : 'Описание'}
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="block max-h-52 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder={`${lang === LangKey.EN ? 'Write description here' : 'Описание'}...`}
                  {...register('description', { required: true, minLength: 2, maxLength: 100 })}
                ></textarea>
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">
                    {lang === LangKey.EN
                      ? 'Max length is 100 characters'
                      : 'Максимальная длинна 100 символов'}
                  </p>
                )}
              </div>
              {/* <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-900"
                  htmlFor="attachment"
                >
                  {lang === LangKey.EN ? 'Upload file' : 'Загрузить файл'}
                </label>
                <input
                  className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-400 file:mr-4 file:-ml-4 file:cursor-pointer file:rounded-none file:rounded-tl-lg file:rounded-bl-lg file:border-none file:bg-gray-800 file:py-2 file:pr-4 file:pl-8 file:text-sm file:text-white file:hover:bg-gray-600 focus:outline-none"
                  aria-describedby="attachment_help"
                  id="attachment"
                  type="file"
                  {...register('attachment', {})}
                />
                <p className="text-sm text-gray-500" id="attachment_help">
                  {lang === LangKey.EN ? 'PNG or JPG' : 'PNG или JPG'}
                </p>
                {errors.attachment && (
                  <p className="mt-2 text-sm text-red-600">
                    <span className="font-medium">Oh, snapp!</span> Attachment.
                  </p>
                )}
              </div> */}
              <div>
                <label htmlFor="users" className="mb-2 block text-sm font-medium text-gray-900">
                  {lang === LangKey.EN ? 'Assignee user' : 'Назначить ответственных'}
                </label>
                <select
                  id="users"
                  className="block h-48 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  {...register('users')}
                  multiple
                >
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
                    {lang === LangKey.EN ? 'Some error happens' : 'Неизвестная ошибка'}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="priority" className="mb-2 block text-sm font-medium text-gray-900">
                  {lang === LangKey.EN ? 'Priority' : 'Приоритет'}
                </label>
                <select
                  id="priority"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  {...register('priority')}
                >
                  <option value="none">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
                {errors.priority && (
                  <p className="mt-2 text-sm text-red-600">
                    {lang === LangKey.EN ? 'Some error happens' : 'Неизвестная ошибка'}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center">
                <Button type="submit">{lang === LangKey.EN ? 'Edit' : 'Изменить '}</Button>
                <Button
                  color="light"
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
  );
};

export default EditTaskModalContent;
