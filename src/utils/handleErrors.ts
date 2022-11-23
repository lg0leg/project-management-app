import type { AppDispatch } from 'app/store';
import { AxiosError } from 'axios';
import { logout } from 'app/actionCreators/authActionCreators';
import type { navigateType } from 'models/typescript';
import { RoutesPath } from 'constants/routes';
export const handleError = (dispatch: AppDispatch, e: unknown, navigate: navigateType) => {
  if (e instanceof AxiosError) {
    const code = e.response?.status as number;
    if (code === 401) {
      dispatch(logout(navigate));
    }
    if (code === 404) {
      navigate(RoutesPath.NOT_FOUND);
    }
  }
};
