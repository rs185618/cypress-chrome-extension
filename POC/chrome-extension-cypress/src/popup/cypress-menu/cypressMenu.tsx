
import React, {useEffect, useState} from 'react';
import './cypress-menu.scss';
import * as ReactDOM from "react-dom";
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import {useSelector} from "../../selectorPicker";
import "./cypress-menu.scss";
import {TabPanel, TabView} from "primereact/tabview";
import { CodeArea } from '../components/code-area/code-area';
const id = 'cypress-menu-assistant';

const types = [
    {label: 'Have Value', value: 'have.value'},
    {label: 'Be Visible', value: 'be.visible'},
    {label: 'Be Hidden', value: 'not.be.visible'},
    {label: 'Exist', value: 'exist'},
    {label: 'Not Exist', value: 'not.exist'},
    {label: 'Be Checked', value: 'be.checked'},
    {label: 'Not Be Checked', value: 'not.be.checked'},
    {label: 'Be Disabled', value: 'be.disabled'},
    {label: 'Not Be Disabled', value: 'not.be.disabled'},
    {label: 'Have length', value: 'have.length'},

    {label: 'Css', value: 'have.css'}];

const assertions = {
    contains: 'contains',
    'have.value': 'have.value',
    'have.css': 'have.css'
}
const CypressMenu = () => {
    const [selectType, _setSelectType] = useState<any>(null);
    const [cySelector, setScySelector] = useState<any>('');
    const [menu, setMenu] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const typeRef = React.useRef(selectType);

    const setSelectType = data => {
        typeRef.current = data;
        _setSelectType(data);
    };

    useEffect(() => {

        document.addEventListener('click', (event) => {
            setScySelector(useSelector(event).cySelector);
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
            document.querySelector(cySelector).classList.remove('hoverBorder');
            document.querySelectorAll('.clickedBorder').forEach(elem => {
                elem.classList.remove('clickedBorder');
            });
            document.querySelector(cySelector).classList.add('clickedBorder');
        } else {

            if(e.target.classList.contains("show-menu")
                || e.target.classList.contains("p-tabview-nav-link")
                || e.target.classList.contains("p-tabview-title")
                || e.target.classList.contains("p-button")
                || e.target.classList.contains("p-dropdown-label")
                || e.target.classList.contains("p-clickable")) {
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
            chrome.storage.local.set(
              { "selector": clickedSelector, "generatedCode":
                    `${generatedCode ? generatedCode + '\n' : ''}${template.replace('{0}', clickedSelector.cySelector).replace('{1}',clickedSelector.value)}` },
              function(){
                  //  Data's been saved boys and girls, go on home
              });
            console.log(clickedSelector);
        });
    }

    const onClickChange = (e) => {
        setSelectType('click')
        generateCode(`cy.get("${cySelector}").click()`);
    }
    const onType = e => {
        setSelectType('type');
        generateCode(`cypress.get("${cySelector}").type("{1}")`);
    }
    const onTypeChange = (e) => {
        setSelectType(e.value);
        let value = ""
        if(e.value === "have.value"){
            if(document.querySelector(cySelector).value){
                value = document.querySelector(cySelector).value;
                generateCode(`cy.get(${cySelector}).should("${e.value}", "${value}")`);
            }
        }
        else if(e.value === "have.css"){
            value = '"color"',  + window.getComputedStyle(document.querySelector(cySelector)).color;
            generateCode(`cy.get(${cySelector}).should("${e.value}", "${value}")`);
        }else if(e.value === "have.length"){
            if(document.querySelector(cySelector).value){
                value = document.querySelector(cySelector).value.length;
                generateCode(`cy.get(${cySelector}).should("${e.value}", "${value}")`);
            }
        }
        else{
            generateCode(`cy.get(${cySelector}).should("${e.value}")`);
        }
    }
    const cancelEventPropagation = (e) => {
        e.nativeEvent.stopImmediatePropagation();
    }
    return <div className={`menu-container ${menu ? 'show-menu' : 'hide-menu'}`}>
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
            <TabPanel header="Actions" >
                <Button label="Click" onClick={(e) => onClickChange(e)} />
                <Button label="Type" onClick={e=>onType(e)}/>
            </TabPanel>
            <TabPanel header="Assertions" >
                <Dropdown value={selectType} options={types} onChange={onTypeChange} placeholder="Should..." onMouseDown={cancelEventPropagation} data-type="assert-selector" />
            </TabPanel>
        </TabView>

    </div>
}

export const renderMenu = () => {
    const el = document.createElement('section');
    el.setAttribute('id', id);
    document.body.appendChild(el);

    return ReactDOM.render(<CypressMenu />, document.getElementById(id));
}
