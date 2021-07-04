
import React, {useEffect, useState} from 'react';
import './cypress-menu.scss';
import * as ReactDOM from "react-dom";
const id = 'cypress-menu-assistant';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import {useSelector} from "../../selectorPicker";
import "./cypress-menu.scss";
const types = [{label: 'Text', value: 'text'}, {label: 'Css', value: 'css'}]
const CypressMenu = () => {
    const [selectType, _setSelectType] = useState<any>(null);
    const [currentEvent, setCurrentEvent] = useState(null);
    const typeRef = React.useRef(selectType);

    const setSelectType = data => {
        typeRef.current = data;
        _setSelectType(data);
    };

    useEffect(() => {
        document.addEventListener('click', (e) => {
            document.querySelector(useSelector(e).cySelector).classList.remove('hoverBorder')
            document.querySelectorAll('.clickedBorder').forEach(elem => {
                elem.classList.remove('clickedBorder');
            });
            document.querySelector(useSelector(e).cySelector).classList.add('clickedBorder');
            if (typeRef.current == 'click') {
                e.preventDefault();
                e.stopImmediatePropagation();
                setCurrentEvent(e);
                generateCode(e);
            }
        }, true);
        document.addEventListener('change', (e) => {
            if (typeRef.current == 'click') {
                generateCode(e)
            }
        }, false);
        document.addEventListener('mouseover', (e) => {
            document.querySelector(useSelector(e).cySelector).classList.add('hoverBorder')
        }, true);
        document.addEventListener('mouseout', (e) => {
            document.querySelector(useSelector(e).cySelector).classList.remove('hoverBorder')
        }, true);
        return () => {
            document.removeEventListener('click', generateCode)
            document.removeEventListener('change', generateCode);
        }
    }, [])

    useEffect(() => {
        if (!selectType && currentEvent) {
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            currentEvent.target.dispatchEvent(clickEvent);

        }
    }, [selectType])


    const generateCode = (event) => {
        let generatedCode;
        chrome.storage.local.get(/* String or Array */["selector", "generatedCode"], (items) => {
            //console.log(items);
            if (items?.generatedCode) {
                generatedCode = items['generatedCode']
            }
            const clickedSelector = useSelector(event).cySelector;
            chrome.storage.local.set({ "selector": clickedSelector, "generatedCode": `${generatedCode ? generatedCode + '\n' : ''}cypress.get('${clickedSelector}').click()` }, function(){
                //  Data's been saved boys and girls, go on home
            });
            //console.log(clickedSelector);
            setSelectType(null);

        });
    }


    const onClickChange = () => {
        setSelectType('click')
    }
    const onTypeChange = (e) => {
        setSelectType(e.value)
    }
    return <div className={`menu-container ${selectType ? 'hide-menu' : 'show-menu'}`}>

        <Button label="Click" onClick={onClickChange} />
        <Dropdown value={selectType} options={types} onChange={onTypeChange} placeholder="Contains..." />

    </div>
}

export const renderMenu = () => {
    const el = document.createElement('section');
    el.setAttribute('id', id);
    document.body.appendChild(el);

    return ReactDOM.render(<CypressMenu />, document.getElementById(id));
}
