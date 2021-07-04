import React from 'react';
import {renderMenu} from "./popup/cypress-menu/cypressMenu";
import {useSelector} from "./selectorPicker";
const id = 'cypress-menu-assistant';
let capture = true;

const renderCypressMenu = () => {


    const getSelectorAndShowMenu = (e) => {
        const section = document.getElementById(id);
        chrome.storage.local.get(/* String or Array */["recorder"], (items) => {
            if (items && items['recorder'] == 'start') {
                const clickedSelector = useSelector(e);
                console.log(items);
                chrome.storage.local.set({"selector": clickedSelector}, function() {
                    if (items && !section && clickedSelector) {
                        renderMenu()
                    }
                });

            }

        });
    }

    document.addEventListener('click', (e) => {
        if (capture) {
            e.preventDefault();
            e.stopImmediatePropagation();
            getSelectorAndShowMenu(e);
            capture = false;
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            e.target.dispatchEvent(clickEvent);
        } else {
            getSelectorAndShowMenu(e);
        }
    }, true)


    document.addEventListener('change', (e) => {
        getSelectorAndShowMenu(e);
    }, false);



}

renderCypressMenu();

