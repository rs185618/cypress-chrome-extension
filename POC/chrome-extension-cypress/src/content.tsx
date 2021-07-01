import React from 'react';
import {renderMenu} from "./popup/cypress-menu/cypressMenu";
const id = 'cypress-menu-assistant';


const renderCypressMenu = () => {

    document.addEventListener('click', () => {
        const section = document.getElementById(id);
        chrome.storage.local.get(/* String or Array */["recorder"], (items) => {
            console.log("items from context: " ,items);
            if (items && items['recorder'] == 'start' && !section) {
                renderMenu()
            }
        });
        if (!section) {
        }
    })
}

renderCypressMenu();
//
// chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//     console.log("hello tab : ", tabs)
// })
