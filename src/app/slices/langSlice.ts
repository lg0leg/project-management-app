import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LangKey } from 'constants/lang';
import { StorageKey } from 'constants/storageKey';

interface IChangeLang {
  lang: string;
}

const initialState = {
  lang: localStorage.getItem(StorageKey.LANG) || LangKey.EN,
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    changeLang(state, action: PayloadAction<IChangeLang>) {
      state.lang = action.payload.lang;
      localStorage.setItem(StorageKey.LANG, action.payload.lang);
    },
  },
});

export default langSlice.reducer;
