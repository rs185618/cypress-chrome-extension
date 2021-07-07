import React, {useEffect, useState} from 'react';
import './cypress-menu.scss';
import * as ReactDOM from "react-dom";
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {useSelector} from "../../selectorPicker";
import "./cypress-menu.scss";
import {TabPanel, TabView} from "primereact/tabview";
import * as utils from "./utils";
import getElementAssertions from './assertionTypes';
import styleProps from './styleProps';

const id = 'cypress-menu-assistant';

const CypressMenu = () => {
    const [selectType, _setSelectType] = useState<any>(null);
    const [cySelector, setCySelector] = useState<any>('');
    const [menu, setMenu] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedElement, setSelectedElement] = useState(null);
    const typeRef = React.useRef(selectType);

    const setSelectType = data => {
        typeRef.current = data;
        _setSelectType(data);
    };

    useEffect(() => {

        document.addEventListener('click', (e) => {
            chrome.storage.local.get(/* String or Array */["recorder"], (items) => {
                if (items && items['recorder'] === 'start') {
                    const clickedSelector = useSelector(e).cySelector;
                    setSelectedElement(e.target);
                    chrome.storage.local.set({"selector": clickedSelector}, function() {
                        setCySelector(useSelector(e).cySelector);
                    });
                }
            });
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
    }, [])

    useEffect(() => {
        displayMenu();
    }, [cySelector])

    const displayMenu = () => {
        if (document.querySelector('.menu-container').classList.contains('hide-menu')) {
            if (cySelector) {
                setMenu(true);
                if (document.querySelector('.clickedBorder')) {
                    document.querySelector('.clickedBorder').classList.remove('clickedBorder');
                    document.querySelector('.hoverBorder').classList.remove('hoverBorder');
                }
                document.querySelector(cySelector).classList.add('clickedBorder');
            }
        } else {
            setMenu(false);
        }
    }

    const onClickChange = () => {
        setSelectType('click')
        utils.generateCode(`cy.get("${cySelector}").click();`);
        displayMenu();
    }
    const onType = () => {
        setSelectType('type');
        utils.generateCode(`cy.get("${cySelector}").type("{1}");`);
        displayMenu();
    }
    const onContains = () => {
        setSelectType('contains');
        utils.generateCode(`cy.get("${cySelector}").contains("{2}")`);
        displayMenu();
    }
    const onTypeChange = (e) => {
        setSelectType(e.value);
        let value = ""
        let toggleView = displayMenu;

        switch (e.value){
            case "have.value":
                if (useSelector(e.target).value) {
                    value = useSelector(e.target).value;
                    utils.generateCode(`cy.get(${cySelector}).should("${e.value}", "${value}");`);
                }
                break;
            case "have.css":
                toggleView = null;
                break;
            case "have.length":
                if (document.querySelector(cySelector).value) {
                    value = document.querySelector(cySelector).value.length;
                    utils.generateCode(`cy.get(${cySelector}).should("${e.value}", "${value}");`);
                }
                break;
            default:
                utils.generateCode(`cy.get(${cySelector}).should("${e.value}");`);
        }
        toggleView && toggleView();
    }
    const onContainerClick = (e) => {
        e.nativeEvent.stopImmediatePropagation();
    }

    const onComputedStyleChange = (e) => {
        const val = e.value
        setSelectedStyle(val);
        const value = window.getComputedStyle(document.querySelector(cySelector))[val];
        utils.generateCode(`cy.get(${cySelector}).should("${selectType}", "${e.value}", "${value}");`);
        displayMenu();
    }
    const types = getElementAssertions(selectedElement);

    return ReactDOM.createPortal(<section id={id}>
        <div className={`menu-container ${menu ? 'show-menu' : 'hide-menu'}`} onClick={onContainerClick}>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Actions">
                    <Button label="Click" onClick={() => onClickChange()}/>
                    {
                        selectedElement && utils.isInputText(selectedElement) ? <Button label="Type" onClick={() => onType()}/> : ""
                    }

                    <Button label="Contains" onClick={() => onContains()}/>
                </TabPanel>
                <TabPanel header="Assertions">
                    <Dropdown value={selectType} options={types} onChange={onTypeChange} placeholder="Should..."
                              data-type="assert-selector"/>
                    {
                        selectType === "have.css" ?
                            <Dropdown value={selectedStyle} options={styleProps} onChange={onComputedStyleChange}
                                      placeholder="Select style..."/> : ""
                    }
                </TabPanel>
            </TabView>
        </div>
    </section>, document.body);
}

export default CypressMenu;
