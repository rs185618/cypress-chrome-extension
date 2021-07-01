
import React, {useEffect, useState} from 'react';
import './cypress-menu.scss';
import * as ReactDOM from "react-dom";
const id = 'cypress-menu-assistant';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import {getClosestParent} from "../../selectorPicker";

const types = [{label: 'Text', value: 'text'}, {label: 'Css', value: 'css'}]
const CypressMenu = () => {
    console.log("hello")
    const [selectType, _setSelectType] = useState<any>(null);
    const typeRef = React.useRef(selectType);

    const setSelectType = data => {
        typeRef.current = data;
        _setSelectType(data);
    };

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (typeRef.current == 'click') {
                generateCode(e)
            }
        });
        return () => {
            document.removeEventListener('click', generateCode)
        }
    }, [])

    useEffect(() => {
        console.log(selectType);
    }, [selectType])


    const generateCode = (event) => {
        let generatedCode;
        chrome.storage.local.get(/* String or Array */["selector", "generatedCode"], (items) => {
            console.log(items);
            if (items?.generatedCode) {
                generatedCode = items['generatedCode']
            }
            if (typeRef.current == 'click') {
                const selector = 'data-testid';
                const parent = getClosestParent(event.target, `[${selector}]`);
                const clickedSelector = `[${selector}='${parent.elem.getAttribute([selector])}'] ${parent.tags.split(' ').reverse().join(' ')}`

                chrome.storage.local.set({ "selector": clickedSelector, "generatedCode": `${generatedCode ? generatedCode + '\n' : ''}cypress.get('${clickedSelector}').click()` }, function(){
                    //  Data's been saved boys and girls, go on home
                });

                setSelectType(null);
                console.log(clickedSelector);
            }

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
