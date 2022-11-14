import React, { Fragment } from 'react';
import './switcher.css';
import { changeLang } from 'app/actionCreators/langActionCreators';
import { store } from 'app/store';
import { useAppSelector } from 'app/hooks';

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
          const lang = e.target.checked == true ? 'en' : 'ru';
          dispatch(changeLang({ lang }));
        }}
        checked={lang == 'en' ? true : false}
      />
      <label className="switcher-label" htmlFor="toggle"></label>
    </Fragment>
  );
}
