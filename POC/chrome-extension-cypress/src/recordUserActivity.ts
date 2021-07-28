import {useSelector} from "./selectorPicker";


const STORAGE_KEY = 'USER_ACTIVITIES';

const clickHandler = (e) => {
    const str = `cy.get(''${useSelector(e).cySelector}).click()`;
    setTostorage(str);
}

const changeHandler = (e) => {
    const target = (e.target as HTMLFormElement);
    const tagName = target.tagName.toLowerCase();
    const type =  tagName === 'textarea' || (tagName === 'input' && target.type === 'text') ? 'type' : 'change'
    const str = `cy.get(''${useSelector(e).cySelector}).${type}("${target.value}")`;
    setTostorage(str);
}

const setTostorage = (str) => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
        chrome.storage.local.set({[STORAGE_KEY]: `${result[STORAGE_KEY] ? result[STORAGE_KEY] : ''} 
         ${str}`});
        console.log(result[STORAGE_KEY]);
    });
}

export const addListeners =  () => {
        const url = window.location.href;
        const str = `cy.visit('${url}')`;
        if(url){
            setTostorage(str);
        }
        document.addEventListener('click', clickHandler, true);
        document.addEventListener('change', changeHandler, false);
}

export const removeListeners = () => {
    chrome.storage.local.remove(STORAGE_KEY);
    document.removeEventListener('click', clickHandler, true);
    document.removeEventListener('change', changeHandler, false);
}