import React, {useEffect, useState} from "react";
import "./Popup.scss";
import {RecordContainer} from "./container/record-container";


export default function Popup() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    chrome.storage.local.set({"testSuitIndex":0},()=>{

    });
    chrome.storage.local.set({"generatedCode":['']},()=>{

    });
    chrome.storage.local.set({"itTitles":['']})


  }, []);

  const hide = (shouldHide) => {
    // console.log(shouldHide);
    // setHidden(shouldHide);
  }


  return <div className={`popupContainer ${hidden ? 'hide-popup' : ''} `}>
    <RecordContainer hidePopup={hide}/>
  </div>;
}
