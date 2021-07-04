
import React, {useEffect, useState} from 'react';
import './cypress-menu.scss';
import * as ReactDOM from "react-dom";
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import {useSelector} from "../../selectorPicker";
import "./cypress-menu.scss";
const id = 'cypress-menu-assistant';

const types = [
    {label: 'Contains', value: 'contains'},
    {label: 'Text', value: 'text'},
    {label: 'Css', value: 'css'}];

const assertions = {
    contains: 'contains',
    text: 'have.text',
    css: 'have.css'
}
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
            displayMenu(event);
        }, false)

        document.addEventListener('mouseover', (e) => {
            if (document.querySelector('.menu-container').classList.contains('hide-menu')) {
                document.querySelector(useSelector(e).cySelector).classList.add('hoverBorder')
            }
        }, true);
        document.addEventListener('mouseout', (e) => {
            if (document.querySelector('.menu-container').classList.contains('hide-menu')) {
                document.querySelector(useSelector(e).cySelector).classList.remove('hoverBorder')
            }
        })
        // return () => document.removeEventListener('click', displayMenu)
    }, [])

    useEffect(() => {
        console.log(selectType);
    }, [selectType])

    const displayMenu = (e) => {
        if (document.querySelector('.menu-container').classList.contains('hide-menu')) {
            setMenu(true);
            document.querySelector(useSelector(e).cySelector).classList.remove('hoverBorder');
            document.querySelectorAll('.clickedBorder').forEach(elem => {
                elem.classList.remove('clickedBorder');
            });
            document.querySelector(useSelector(e).cySelector).classList.add('clickedBorder');
        } else {
            if(e.target.classList.contains("show-menu") || e.target.classList.contains("p-dropdown-label") || e.target.classList.contains("p-clickable")) {
                return;
            }
            setMenu(false);
        }

    }


    const generateCode = (template) => {
        let generatedCode;
        chrome.storage.local.get(/* String or Array */["selector", "generatedCode"], (items) => {
            console.log(items);
            if (items?.generatedCode) {
                generatedCode = items['generatedCode']
            }
            const clickedSelector = items['selector'];
            chrome.storage.local.set({ "selector": clickedSelector, "generatedCode": `${generatedCode ? generatedCode + '\n' : ''}${template.replace('{0}', clickedSelector)}` }, function(){
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
        generateCode('cypress.get("{0}").click()');
    }
    const onTypeChange = (e) => {
        setSelectType(e.value);
        generateCode(`cypress.get("{0}").should("${assertions[e.value]}", "")`);
    }
    const cancelEventPropagation = (e) => {
        e.nativeEvent.stopImmediatePropagation();
    }

    console.log(selectType)
    console.log(typeRef)
    return <div className={`menu-container ${menu ? 'show-menu' : 'hide-menu'}`}>

        <Button label="Click" onClick={(e) => onClickChange(e)} />
        <Dropdown value={selectType} options={types} onChange={onTypeChange} placeholder="Should..." onMouseDown={cancelEventPropagation} data-type="assert-selector" />

    </div>
}

export const renderMenu = () => {
    const el = document.createElement('section');
    el.setAttribute('id', id);
    document.body.appendChild(el);

    return ReactDOM.render(<CypressMenu />, document.getElementById(id));
}
