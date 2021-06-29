// Listen to messages sent from other parts of the extension.
import {selectorPicker} from "./selectorPicker";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if (request.popupMounted) {
        console.log('eventPage notified that Popup.tsx has mounted.');
    }

    return isResponseAsync;
});

/*chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status === 'complete'){
        chrome.scripting.executeScript({
            files:  ['selectorPicker.ts'],
            target: {tabId: tab.id}
        });
    }

})*/


chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: selectorPicker
    });
});
/*chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
   // console.log(chrome.documentScan);
    chrome.tabs.executeScript({  file: 'selectorPicker.ts', allFrames: true })
    /!*chrome.tabs.executeScript(
        tabs[0].id,
        { code:  selectorPicker(window[tabs[0].windowId])
        });*!/
});*/
//chrome.browserAction.onClicked.addListener((tab)=>console.log(tab));
/*
chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log(activeInfo);
    console.log(activeInfo.tabId);
    window.get(64)
    //selectorPicker();
});*/
