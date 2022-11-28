import { FC } from 'react';
import { useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import { Button } from './Button';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

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
            type="button"
            onClick={onCancel}
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
          >
            <div className="h-5 w-5">
              <IoClose size={20} />
            </div>
            <span className="sr-only">{lang === LangKey.EN ? 'Close' : 'Закрыть'}</span>
          </button>
          <div className="p-6 text-center">
            <div className="mx-auto mb-4 h-14 w-14 text-gray-400">
              <AiOutlineExclamationCircle size={56} />
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              {lang === LangKey.EN
                ? `Are you sure you want to delete this ${type}?`
                : `Вы уверены что хотите удалить ${type}?`}
            </h3>
            <Button color="red" onClick={onConfirm} type="button">
              {lang === LangKey.EN ? 'Delete' : 'Удалить'}
            </Button>
            <Button color="light" onClick={onCancel} type="button">
              {lang === LangKey.EN ? 'Cancel' : 'Отмена'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConformation;
