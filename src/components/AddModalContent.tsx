import { useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import { FC, ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './Button';

interface IAddModalContentProps {
  type: string;
  onCancel: () => void;
  children?: ReactNode;
}

export interface ITmp {
  title: string;
}

export const AddModalContent: FC<IAddModalContentProps> = ({ type, onCancel }) => {
  const { lang } = useAppSelector((state) => state.langReducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITmp>();

  const onSubmit: SubmitHandler<ITmp> = (data) => {
    console.log('submited: ', data);
    onCancel();
    // const { login, password } = data;
    // dispatch(fetchLogin({ login, password, navigate }));
  };

  return (
    <>
      {/* <!-- Main modal --> */}
      <div className="w-[400px] overflow-y-auto overflow-x-hidden p-4">
        <div className="relative h-full w-full max-w-md md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg bg-white shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => onCancel()}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
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
                    {...register('title', { minLength: 2, maxLength: 30 })}
                    required
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600">
                      <span className="font-medium">Oh, snapp!</span> Some error message.
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

export default AddModalContent;
