import type { AppDispatch } from 'app/store';
import { AxiosError } from 'axios';
import { logout } from 'app/actionCreators/authActionCreators';
import type { navigateType } from 'models/typescript';
import { RoutesPath } from 'constants/routes';
import { toast } from 'react-toastify';
import { store } from 'app/store';
import { LangKey } from 'constants/lang';
export const handleError = (dispatch: AppDispatch, e: unknown, navigate: navigateType) => {
  if (e instanceof AxiosError) {
    const { lang } = store.getState().langReducer;
    const code = e.response?.status as number;
    if (code === 401) {
      dispatch(logout(navigate));
      toast.error(lang === LangKey.EN ? 'Authorisation Error' : 'Ошибка авторизации');
    }
    if (code === 403) {
      toast.error(lang === LangKey.EN ? 'Authorisation Error' : 'Ошибка авторизации');
    }
    if (code === 404) {
      navigate(RoutesPath.NOT_FOUND);
    }
  }
};
