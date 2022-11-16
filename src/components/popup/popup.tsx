import React, { ReactNode, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './popup.css';

export default function Popup(props: {
  popupVisible: boolean;
  setPopupVisible: (arg: boolean) => void;
  children: ReactNode;
}) {
  const [innerAnim, setInnerAnim] = useState(false);

  return (
    <CSSTransition
      in={props.popupVisible}
      timeout={500}
      mountOnEnter
      unmountOnExit
      classNames="external-animation"
      onEnter={() => setInnerAnim(true)}
      onExited={() => setInnerAnim(false)}
    >
      <div
        className="overlay"
        onClick={() => {
          setInnerAnim(false);
          props.setPopupVisible(false);
        }}
      >
        <CSSTransition
          in={innerAnim}
          timeout={400}
          mountOnEnter
          unmountOnExit
          classNames="inner-animation"
        >
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            {props.children}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}
