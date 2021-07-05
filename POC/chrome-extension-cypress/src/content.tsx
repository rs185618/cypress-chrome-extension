import React from "react";
import * as ReactDOM from "react-dom";
import CypressMenu from "./popup/cypress-menu/cypressMenu";
import {useSelector} from "./selectorPicker";
const id = 'cypress-menu-assistant';
let capture = true;

const renderCypressMenu = () => {
    const getSelectorAndShowMenu = (e) => {

        chrome.storage.local.get(/* String or Array */["recorder"], (items) => {
            if (items && items['recorder'] == 'start') {
                const clickedSelector = useSelector(e);
                chrome.storage.local.set({"selector": clickedSelector}, function() {
                    const section = document.getElementById(id);
                    if (items && !section && clickedSelector) {
                        ReactDOM.render(<CypressMenu />, document.createDocumentFragment()) ;
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
    }, true);
    document.addEventListener('change', (e) => {
        getSelectorAndShowMenu(e);
    }, false);
}

renderCypressMenu();

