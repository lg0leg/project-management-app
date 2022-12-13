import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from 'app/store';
import { useNavigate } from 'react-router-dom';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppNavigate = () => {
  const nav = useNavigate();
  const navigate = (path: string) => nav(path);
  return navigate;
};
