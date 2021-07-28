import React from "react";
import * as ReactDOM from "react-dom";
import CypressMenu from "./popup/cypress-menu/cypressMenu";
import * as recordUserActivity from "./recordUserActivity";
const id = 'cypress-menu-assistant';

const renderCypressMenu = () => {
    window.onload = function() {
        chrome.storage.local.set({ "refresh":  true,"testSuitIndex":0});
    };
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch(true){
            case request.menu === 'started':
                const section = document.getElementById(id)
                if (!section) {
                    ReactDOM.render(<CypressMenu />, document.createDocumentFragment()) ;
                }
                break;
            case request.menu ==='stopped':
                chrome.storage.local.get(['testSuitIndex','itTitles'],(items)=>{
                    const newTestIndex = items['testSuitIndex'] ? items['testSuitIndex'] + 1 : 1;
                    chrome.storage.local.set({'testSuitIndex':newTestIndex})
                })
                break;
            case request.modeChanged:
                recordUserActivity.removeListeners();
                break;
            case !request.modeChanged:
                recordUserActivity.addListeners();
                break;
        }
    })
}



renderCypressMenu();

