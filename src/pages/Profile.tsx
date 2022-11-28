import React, { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { IAuthRequest, IToken } from 'models/typescript';
import AuthInput from 'components/AuthInput';
import AuthSubmit from 'components/AuthSubmit';
import { useAppDispatch, useAppNavigate, useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import SpinnerWithOverlay from 'components/spinners/SpinnerWithOverlay';
import DeleteUserBtn from 'components/DeleteUserBtn';
import {
  getValidateMaxLength,
  getValidateMinLength,
  getValidatePassword,
  getValidateName,
} from 'utils/getAuthValidation';
import { InputLength, ValidateKey } from 'constants/authValidation';
import { fetchGetUser } from 'app/actionCreators/userActionCreator';
import { isExpired, decodeToken } from 'react-jwt';
import { logout } from 'app/actionCreators/authActionCreators';
import Popup from 'components/popup/popup';
import { EditUserConformation } from 'components/EditUserConformation';

export const Profile: FC = () => {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingAuth, token } = useAppSelector((state) => state.authReducer);
  const {
    user,
    httpCode,
    isError,
    isLoading: isLoadingUser,
  } = useAppSelector((state) => state.userReducer);
  const { lang } = useAppSelector((state) => state.langReducer);
  const isLoading = isLoadingUser || isLoadingAuth;
  const [userId, setUserId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isShowError, setShowError] = useState(false);
  const [isEmptyError, setEmptyError] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    name: '',
    login: '',
    oldLogin: '',
    userId,
  });
  const onCancel = () => setModalOpen(false);

  useEffect(() => {
    if (isExpired(token)) {
      dispatch(logout(navigate));
    }
  });

  useEffect(() => {
    if (isExpired(token)) {
      dispatch(logout(navigate));
    } else {
      const { id: _id } = decodeToken(token) as IToken;
      setUserId(_id);
      dispatch(fetchGetUser({ _id, navigate }));
    }
  }, [token]);

  useEffect(() => {
    let timeout;
    if (isError) setShowError(true);
    if (!isError) timeout = setTimeout(() => setShowError(false), 10000);
  }, [isError]);

  useEffect(() => {
    if (isEmptyError) setTimeout(() => setEmptyError(false), 10000);
  }, [isEmptyError]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAuthRequest>();
  const onSubmit: SubmitHandler<IAuthRequest> = (data) => {
    const { password, name, login } = data;
    const newLogin = data.login || user.login;
    const newName = data.name || user.name;
    if (!password && !name && !login) {
      setEmptyError(true);
      return;
    }
    setFormData({
      newPassword: password,
      name: newName,
      login: newLogin,
      oldLogin: user.login,
      userId,
    });
    setModalOpen(true);
  };

  let errorText = '';
  if (httpCode === 409) {
    errorText = lang === LangKey.EN ? 'This login already exists' : 'Такой логин уже существует';
  }

  return (
    <div className="min-h-[100%] bg-gray-300">
      <SpinnerWithOverlay isLoading={isLoading} />
      <div className="flex min-h-[calc(100vh-180px)] flex-col justify-between pt-[8px]">
        <div className="flex min-h-[calc(100vh-212px)] w-full items-center justify-center  bg-profile bg-contain bg-no-repeat">
          <form
            className="rounded-xl border-2 border-gray-400 bg-gray-50/90 p-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-center text-lg font-medium">{`${user.name}(${user.login})`}</h2>
            {isShowError && (
              <div className="underline-offset-3 w-full text-center text-base font-medium text-red-500 underline underline-offset-2">
                {errorText}
              </div>
            )}

            <AuthInput
              label="name"
              title={lang === LangKey.EN ? 'New name' : 'Новое Имя'}
              placeholder={lang === LangKey.EN ? 'New name' : 'Новое Имя'}
              register={register}
              type="text"
              minLength={getValidateMinLength(InputLength.NAME_MIN)}
              maxLength={getValidateMaxLength(InputLength.NAME_MAX)}
              pattern={getValidateName()}
              errors={errors}
            />

            <AuthInput
              label="login"
              title={lang === LangKey.EN ? 'New login' : 'Новый логин'}
              placeholder={lang === LangKey.EN ? 'New login' : 'Новый логин'}
              register={register}
              type="text"
              minLength={getValidateMinLength(InputLength.LOGIN_MIN)}
              maxLength={getValidateMaxLength(InputLength.LOGIN_MAX)}
              errors={errors}
            />

            <AuthInput
              label="password"
              title={lang === LangKey.EN ? 'New password' : 'Новый пароль'}
              placeholder={lang === LangKey.EN ? 'New password' : 'Новый пароль'}
              register={register}
              type="password"
              minLength={getValidateMinLength(InputLength.PASS_MIN)}
              maxLength={getValidateMaxLength(InputLength.PASS_MAX)}
              pattern={getValidatePassword()}
              errors={errors}
            />

            <AuthInput
              label="passwordRepeat"
              title={lang === LangKey.EN ? 'Repeat new password' : 'Повторите новый пароль'}
              placeholder={lang === LangKey.EN ? 'Repeat new password' : 'Повторите новый пароль'}
              register={register}
              type="password"
              minLength={getValidateMinLength(InputLength.PASS_MIN)}
              maxLength={getValidateMaxLength(InputLength.PASS_MAX)}
              errors={errors}
              validate={{
                matchPassword: (value) => watch('password') === value || ValidateKey.REPEAT_PASS,
              }}
            />

            <AuthSubmit text={lang === LangKey.EN ? 'Edit' : 'Редактировать'} />
            {isEmptyError && (
              <p className="max-w-[250px] text-center text-sm font-medium text-red-500">
                {lang === LangKey.EN ? 'all fields are empty' : 'все поля пустые'}
              </p>
            )}
            <DeleteUserBtn
              text={lang === LangKey.EN ? 'Delete user' : 'Удалить пользователя'}
              _id={userId}
            />
          </form>
        </div>
        <i>
          <a
            className="ml-1 text-blue-900 hover:underline"
            href="https://www.freepik.com/"
            target="blank"
            rel="noreferrer noopener"
          >
            Designed by stories / Freepik
          </a>
        </i>
      </div>
      <Popup popupVisible={modalOpen} setPopupVisible={setModalOpen}>
        <EditUserConformation formData={formData} onCancel={onCancel} />
      </Popup>
    </div>
  );
};

export default Profile;
