import { AppDispatch } from 'app/store';
import { langSlice } from '../slices/langSlice';

interface IProp {
  lang: string;
}

export const changeLang = ({ lang }: IProp) => {
  return (dispatch: AppDispatch) => {
    dispatch(
      langSlice.actions.changeLang({
        lang,
      })
    );
  };
};
