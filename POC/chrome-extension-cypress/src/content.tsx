import React from "react";
import * as ReactDOM from "react-dom";
import CypressMenu from "./popup/cypress-menu/cypressMenu";
const id = 'cypress-menu-assistant';

const renderCypressMenu = () => {

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.menu === 'started') {
            const section = document.getElementById(id)
            if (!section) {
                ReactDOM.render(<CypressMenu />, document.createDocumentFragment()) ;
            }
        }
    })
}



renderCypressMenu();

