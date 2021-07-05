import React, {useEffect, useState} from "react";
import "./Popup.scss";
import {RecordContainer} from "./container/record-container";


export default function Popup() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });

  }, []);

  const hide = (shouldHide) => {
    // console.log(shouldHide);
    // setHidden(shouldHide);
  }


  return <div className={`popupContainer ${hidden ? 'hide-popup' : ''} `}>
    <RecordContainer hidePopup={hide}/>
  </div>;
}
