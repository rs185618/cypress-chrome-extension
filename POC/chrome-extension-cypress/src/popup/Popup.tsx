import React, { useEffect } from "react";
import "./Popup.scss";
import {RecordContainer} from "./container/record-container";
import {selectorPicker} from "../selectorPicker";


export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.scripting.executeScript({ target: {tabId: tabs[0].id}, function: selectorPicker } ).then();
    })
  }, []);


  return <div className="popupContainer">
    <RecordContainer/>
  </div>;
}
