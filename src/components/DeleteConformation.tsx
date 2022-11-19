import { FC } from 'react';
import { useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import { Button } from './Button';

interface IDeleteConformationProps {
  type: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConformation: FC<IDeleteConformationProps> = ({ type, onConfirm, onCancel }) => {
  const { lang } = useAppSelector((state) => state.langReducer);

  return (
    <div className="overflow-y-auto overflow-x-hidden p-4">
      <div className="relative h-full w-full max-w-md ">
        <div className="relative rounded-lg bg-white shadow">
          <button
            onClick={onCancel}
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
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
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 h-14 w-14 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this {type}?
            </h3>
            <Button color="red" onClick={onConfirm}>
              {lang === LangKey.EN ? 'Delete' : 'Удалить'}
            </Button>
            <Button color="alternative" onClick={onCancel}>
              {lang === LangKey.EN ? 'Cancel' : 'Отмена'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConformation;
