import React, { Fragment } from 'react';
import './switcher.css';
import { changeLang } from 'app/actionCreators/langActionCreators';
import { store } from 'app/store';
import { useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';

export default function Switcher() {
  const { dispatch } = store;
  const { lang } = useAppSelector((state) => state.langReducer);

  return (
    <Fragment>
      <input
        className="switcher-input"
        type="checkbox"
        id="toggle"
        onChange={(e) => {
          const lang = e.target.checked == true ? LangKey.EN : LangKey.RU;
          dispatch(changeLang({ lang }));
        }}
        checked={lang == LangKey.EN ? true : false}
      />
      <label className="switcher-label" htmlFor="toggle"></label>
    </Fragment>
  );
}
