import React, { useEffect } from "react";
import "./Popup.scss";
import {RecordContainer} from "./container/record-container";


export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);


  return <div className="popupContainer">
    <RecordContainer/>
  </div>;
}
