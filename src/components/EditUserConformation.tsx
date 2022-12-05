import { FC } from 'react';
import { LangKey } from 'constants/lang';
import { Button } from './Button';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

import ProfileConfirmInput from 'components/ProfileConfirmInput';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import {
  getValidateMaxLength,
  getValidateMinLength,
  getValidatePassword,
} from 'utils/getAuthValidation';
import { InputLength } from 'constants/authValidation';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { IProfileConfirm, IProfileConfirmData } from 'models/typescript';
import { fetchConfirmUpdateUser } from 'app/actionCreators/authActionCreators';
import { fetchUpdateUser } from 'app/actionCreators/userActionCreator';
interface IEditUserConformation {
  formData: IProfileConfirmData;
  onCancel: () => void;
}

export const EditUserConformation: FC<IEditUserConformation> = ({ formData, onCancel }) => {
  const { lang } = useAppSelector((state) => state.langReducer);
  const { httpCode, isError } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileConfirm>();
  const onSubmit: SubmitHandler<IProfileConfirm> = (data) => {
    const { oldPassword } = data;
    const { name, login, oldLogin, newPassword, userId } = formData;
    const updateUser = () => {
      const password = newPassword || oldPassword;
      dispatch(
        fetchUpdateUser({
          _id: userId,
          login,
          name,
          password,
          navigate,
          lang,
        })
      );
      onCancel();
    };
    dispatch(
      fetchConfirmUpdateUser({ login: oldLogin, password: oldPassword, navigate, cb: updateUser })
    );
  };
  let errorText = '';
  if (httpCode === 401) {
    errorText = lang === LangKey.EN ? 'Wrong password' : 'Неправильный пароль';
  }
  return (
    <div className="overflow-y-auto overflow-x-hidden p-4">
      <form className="relative h-full w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
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
            {isError && (
              <div className="underline-offset-3 w-full text-center text-base font-medium text-red-500 underline underline-offset-2">
                {errorText}
              </div>
            )}
            <div className="mx-auto mb-4 h-14 w-14 text-gray-400">
              <AiOutlineExclamationCircle size={56} />
            </div>
            <ProfileConfirmInput
              label="oldPassword"
              title={lang === LangKey.EN ? 'Enter old password' : 'Введите старый пароль'}
              placeholder={lang === LangKey.EN ? 'old password' : 'старый пароль'}
              register={register}
              type="password"
              minLength={getValidateMinLength(InputLength.PASS_MIN)}
              maxLength={getValidateMaxLength(InputLength.PASS_MAX)}
              pattern={getValidatePassword()}
              errors={errors}
            />
            <Button color="red" type="submit">
              {lang === LangKey.EN ? 'Edit' : 'Редактировать'}
            </Button>
            <Button color="alternative" onClick={onCancel} type="button">
              {lang === LangKey.EN ? 'Cancel' : 'Отмена'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUserConformation;
