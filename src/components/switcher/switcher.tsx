import React, { Fragment } from 'react';
// import { CHANGE_LANG, store } from 'app/store';
import './switcher.css';

export default function Switcher() {
  return (
    <Fragment>
      <input
        className="switcher-input"
        type="checkbox"
        id="toggle"
        // onChange={(e) => {
        //   const lang = e.target.checked == true ? 'en' : 'ru';
        //   store.dispatch(CHANGE_LANG(lang));
        // }}
      />
      <label className="switcher-label" htmlFor="toggle"></label>
    </Fragment>
  );
}
