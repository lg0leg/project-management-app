import { FC } from 'react';
import { LangKey } from 'constants/lang';
import { Button } from './Button';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

import AuthInput from 'components/AuthInput';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import {
  getValidateMaxLength,
  getValidateMinLength,
  getValidatePassword,
} from 'utils/getAuthValidation';
import { InputLength } from 'constants/authValidation';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IEditUserConformation {
  _id: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const EditUserConformation: FC<IEditUserConformation> = ({ onConfirm, onCancel }) => {
  const { lang } = useAppSelector((state) => state.langReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthRequest>();
  const onSubmit: SubmitHandler<IAuthRequest> = (res) => {
    setModalOpen(true);

    // const newLogin = res.login || user.name;
    // const newName = res.name || user.login;
    // dispatch(
    //   fetchUpdateUser({
    //     _id: userId,
    //     login: newLogin,
    //     name: newName,
    //     password: res.password,
    //     navigate,
    //   })
    // );
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden p-4">
      <form className="relative h-full w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative rounded-lg bg-white shadow">
          <button
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

            <AuthInput
              label="password"
              title={lang === LangKey.EN ? 'enter old passord' : 'введите старый пароль'}
              placeholder={lang === LangKey.EN ? 'old passord' : 'старый пароль'}
              register={register}
              type="password"
              minLength={getValidateMinLength(InputLength.PASS_MIN)}
              maxLength={getValidateMaxLength(InputLength.PASS_MAX)}
              pattern={getValidatePassword()}
              errors={errors}
            />
            <Button color="red" onClick={onConfirm}>
              {lang === LangKey.EN ? 'Delete' : 'Удалить'}
            </Button>
            <Button color="alternative" onClick={onCancel}>
              {lang === LangKey.EN ? 'Cancel' : 'Отмена'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUserConformation;
