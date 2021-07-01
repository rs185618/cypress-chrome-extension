
import React, {useEffect, useState} from 'react';
import './cypress-menu.scss';
import * as ReactDOM from "react-dom";
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const id = 'cypress-menu-assistant';
const types = [{label: 'Text', value: 'text'}, {label: 'Css', value: 'css'}];

const CypressMenu = () => {
    const [selectType, _setSelectType] = useState<any>(null);
    const [menu, setMenu] = useState(false);
    const typeRef = React.useRef(selectType);

    const setSelectType = data => {
        typeRef.current = data;
        _setSelectType(data);
    };

    useEffect(() => {

        document.addEventListener('click', (event) => {
            displayMenu(event)
        }, false)
        // return () => document.removeEventListener('click', displayMenu)
    }, [])

    useEffect(() => {
        console.log(selectType);
    }, [selectType])

    const displayMenu = (event) => {
        if (document.querySelector('.menu-container').classList.contains('hide-menu')) {
            setMenu(true)
        } else {
            setMenu(false)
        }

    }


    const generateCode = () => {
        let generatedCode;
        chrome.storage.local.get(/* String or Array */["selector", "generatedCode"], (items) => {
            console.log(items);
            if (items?.generatedCode) {
                generatedCode = items['generatedCode']
            }
            const clickedSelector = items['selector'];
            chrome.storage.local.set({ "selector": clickedSelector, "generatedCode": `${generatedCode ? generatedCode + '\n' : ''}cypress.get('${clickedSelector}').click()` }, function(){
                //  Data's been saved boys and girls, go on home
            });
            console.log(clickedSelector);
        });
    }

    const onClickChange = (e) => {
        setSelectType('click')
        // setMenu(false)
        // e.preventDefault()
        // e.stopPropagation()
        generateCode();
    }
    const onTypeChange = (e) => {
        setSelectType(e.value)
    }

    console.log(selectType)
    console.log(typeRef)
    return <div className={`menu-container ${menu ? 'show-menu' : 'hide-menu'}`}>

        <Button label="Click" onClick={(e) => onClickChange(e)} />
        <Dropdown value={selectType} options={types} onChange={onTypeChange} placeholder="Contains..." />

    </div>
}

export const renderMenu = () => {
    const el = document.createElement('section');
    el.setAttribute('id', id);
    document.body.appendChild(el);

    return ReactDOM.render(<CypressMenu />, document.getElementById(id));
}
