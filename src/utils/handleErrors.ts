import type { AppDispatch } from 'app/store';
import { AxiosError } from 'axios';
import { logout } from 'app/actionCreators/authActionCreators';

export const handleError401 = (
  dispatch: AppDispatch,
  e: unknown,
  navigate: (path: string) => void
) => {
  if (e instanceof AxiosError) {
    const code = e.response?.status as number;
    if (code === 401) {
      dispatch(logout(navigate));
    }
  }
};
