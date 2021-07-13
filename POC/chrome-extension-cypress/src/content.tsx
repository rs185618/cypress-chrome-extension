import React from "react";
import * as ReactDOM from "react-dom";
import CypressMenu from "./popup/cypress-menu/cypressMenu";
const id = 'cypress-menu-assistant';

const renderCypressMenu = () => {
    window.onload = function() {
        chrome.storage.local.set({ "refresh":  true});
    };
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.menu === 'started') {
            const section = document.getElementById(id)
            if (!section) {
                ReactDOM.render(<CypressMenu />, document.createDocumentFragment()) ;
            }
        }
        else if(request.menu ==='stopped'){
            chrome.storage.local.get(['testSuitIndex','itTitles'],(items)=>{
                console.log('*******',typeof items['testSuitIndex'],items);
                chrome.storage.local.set({'testSuitIndex':items['testSuitIndex'] + 1,'itTitles':items['itTitles']})
            })
        }
    })
}



renderCypressMenu();

