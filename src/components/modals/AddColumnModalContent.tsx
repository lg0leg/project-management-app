import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import { FC, ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiXMark } from 'react-icons/hi2';
import { fetchCreateColumn } from 'app/actionCreators/columnActionCreator';
import { useParams } from 'react-router-dom';
import { IColumn } from 'models/dbTypes';
import { Button } from 'components/Button';

interface IAddColumnModalContentProps {
  onCancel: () => void;
  children?: ReactNode;
}

export const AddColumnModalContent: FC<IAddColumnModalContentProps> = ({ onCancel }) => {
  const { lang } = useAppSelector((state) => state.langReducer);
  const { columns } = useAppSelector((state) => state.columnReducer);
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const _id = id ?? '';
  const { id: userId } = decodeToken(token) as IToken;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IColumn>();

  const onSubmit: SubmitHandler<IColumn> = (data) => {
    console.log('submited: ', data);
    console.log('type: column');
    const { title } = data;
    // onConfirm();
    const columnOrder = columns.filter((col) => col.boardId === _id).length;
    dispatch(fetchCreateColumn({ title: title, boardId: _id, order: columnOrder, navigate }));
    onCancel();
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
              <h3 className="mb-4 text-xl font-medium text-gray-900">
                {lang === LangKey.EN ? 'Create new column' : 'Добавить колонку'}
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
                    placeholder="Title..."
                    {...register('title', { required: true, minLength: 2, maxLength: 50 })}
                    // required
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600">
                      <span className="font-medium">Oh, snapp!</span> Type title beetwen 2 and 50
                      characters.
                    </p>
                  )}
                </div>
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

export default AddColumnModalContent;
