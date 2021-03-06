import React, {useEffect, useState} from 'react';
import './cypress-menu.scss';
import * as ReactDOM from "react-dom";
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {getClosestParent, useSelector} from "../../selectorPicker";
import {TabPanel, TabView} from "primereact/tabview";
import * as utils from "./utils";
import getElementAssertions from './assertionTypes';
import styleProps from './styleProps';

const id = 'cypress-menu-assistant';
let preventClickEvent = false;
const CypressMenu = () => {
    const [selectType, _setSelectType] = useState<any>(null);
    const [cySelector, setCySelector] = useState<any>('');
    const [typedValue, setTypedValue] = useState<any>('');
    const [menu, setMenu] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedElement, setSelectedElement] = useState(null);
    const [testTitle, setTestTitle] = useState('');
    const typeRef = React.useRef(selectType);

    useEffect(() => {

        addEventListeners();
        chrome.runtime.onMessage.addListener((request) => {
            chrome.storage.local.get("popup",items=>{
                if (request.menu === 'started' || (request.modeChanged === true && items["popup"]===false)) {
                    addEventListeners();
                }
                if (request.menu === 'stopped'|| request.modeChanged === false) {
                    removeEventListeners()
                }
            })

        });


    }, []);

    useEffect(() => {
        if (cySelector && document.querySelector(cySelector).id === 'test-title-input') { // no idea why this works, but it does
            return;
        }
        displayMenu();
    }, [cySelector])
    const setSelectType = data => {
        typeRef.current = data;
        _setSelectType(data);
    };
    const addEventListeners = () => {
        document.addEventListener('click', clickListener, true);
        document.addEventListener('change', changeListener, false);
        document.addEventListener('mouseover', mouseOverListener, true);
        document.addEventListener('mouseout', mouseOutListener);
    }
    const removeEventListeners = () => {
        document.removeEventListener('click', clickListener, true)
        document.removeEventListener('change', changeListener, false)
        document.removeEventListener('mouseover', mouseOverListener, true);
        document.removeEventListener('mouseout', mouseOutListener);
    }
    const resetAll = () => {
        _setSelectType(null);
        setCySelector('');
        setTypedValue('');
        setMenu(false);
        setActiveIndex(0);
        setSelectedStyle('');
        setSelectedElement(null);
    };
    const clickListener = (e) => {
        const parent = document.querySelector('.menu-container');
        if (e.target.classList.contains('p-dropdown-item')) {
            e.preventDefault();
            return;
        }
        if (!preventClickEvent && !(parent !== e.target && parent.contains(e.target))) {
            e.stopImmediatePropagation();
            e.preventDefault();
            chrome.storage.local.get(/* String or Array */["recorder"], (items) => {
                if (items && items['recorder'] === 'start') {
                    const clickedSelector = useSelector(e).cySelector;
                    setSelectedElement(e.target);
                    chrome.storage.local.set({"selector": clickedSelector}, function () {
                        setCySelector(useSelector(e).cySelector);
                        setTypedValue(useSelector(e).text);
                    });
                }
            });
        } else {
            preventClickEvent = false;
            return;
        }
    }
    const changeListener = (e) => {
        chrome.storage.local.get(/* String or Array */["recorder"], (items) => {
            if (items && items['recorder'] === 'start') {
                setSelectedElement(e.target);
                chrome.storage.local.set({"selector": useSelector(e).cySelector}, function () {
                    setCySelector(useSelector(e).cySelector);
                });
            }
        });
    }
    const mouseOverListener = (e) => {
        if (document.querySelector('.menu-container')?.classList.contains('hide-menu')) {
            if (document.querySelector(useSelector(e).cySelector)?.hasAttribute('type') &&
                document.querySelector(useSelector(e).cySelector)?.getAttribute('type') === 'checkbox' ||
                document.querySelector(useSelector(e).cySelector)?.getAttribute('type') === 'radio') {
                document.querySelector(useSelector(e).cySelector).parentElement.classList.add('hoverBorder')
            } else {
                document.querySelector(useSelector(e).cySelector).classList.add('hoverBorder')
            }
        }

    }
    const mouseOutListener = () => {
        if (document.querySelector('.menu-container')?.classList.contains('hide-menu')) {
            document.querySelector('.hoverBorder')?.classList.remove('hoverBorder')
        }
    }


    const displayMenu = () => {
        if (document.querySelector('.menu-container')?.classList.contains('hide-menu')) {
            if (cySelector) {
                if (document.querySelector(cySelector)?.hasAttribute('class')) {
                    setMenu(true);
                    if (document.querySelector('.clickedBorder')) {
                        document.querySelector('.clickedBorder')?.classList.remove('clickedBorder');
                        document.querySelector('.hoverBorder')?.classList.remove('hoverBorder');
                    }
                    if (document.querySelector(cySelector).hasAttribute('type') &&
                        document.querySelector(cySelector).type === 'checkbox' ||
                        document.querySelector(cySelector).type === 'radio') {
                        document.querySelector(cySelector).parentElement.classList.add('clickedBorder')
                    } else {
                        document.querySelector(cySelector).classList.add('clickedBorder');
                    }
                }
            }
        } else {
            document.querySelector('.clickedBorder')?.classList.remove('clickedBorder');
            document.querySelector('.hoverBorder')?.classList.remove('hoverBorder');
            onTitleChange()
            resetAll()
        }
    }
    const onTitleChange = () => {
        chrome.storage.local.get(["itTitles", 'testSuitIndex',], (items) => {
            const index = items["testSuitIndex"] ? items["testSuitIndex"]:0;
            const itTitles = items["itTitles"] ? items["itTitles"] :[];
            itTitles[index] = testTitle;
            chrome.storage.local.set({"itTitles": itTitles}, () => {

            });
        });
    }
    const onClickChange = () => {
        setSelectType('click')
        utils.generateCode(`cy.get("${cySelector}").click();`);
        displayMenu();
        preventClickEvent = true;
        if (document.querySelector(cySelector).tagName === 'svg') {
            document.querySelector(cySelector).parentElement.click();
        } else {
            document.querySelector(cySelector).click();
        }

    }
    const onType = () => {
        setSelectType('type');
        utils.generateCode(`cy.get("${cySelector}").first().type("${document.querySelector(cySelector).value}");`);
        displayMenu();
    }
    const onContains = () => {
        setSelectType('contains');
        const contain  = typedValue || '';
        utils.generateCode(`cy.get("${cySelector}").contains("${contain}")`);
        displayMenu();
    }
    const onTypeChange = (e) => {
        setSelectType(e.value);
        let value = null;
        let toggleView = displayMenu;
        const cySelectorElement = document.querySelector(cySelector);
        switch (e.value) {
            case "have.value":
                value = cySelectorElement.value ? cySelectorElement.value : '';
                break;
            case "have.css":
                toggleView = null;
                break;
            case "have.length":
                value = cySelectorElement.value ? cySelectorElement.value.length : 0;
                break;
            default:
                utils.generateCode(`cy.get(${cySelector}).should("${e.value}");`);
        }
        if(value !== null){
            utils.generateCode(`cy.get(${cySelector}).should("${e.value}", "${value}");`);
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
            <div className='test-title'>
                <label>Test Title:</label>
                <input id='test-title-input' onChange={e => setTestTitle(e.target.value)}/>
            </div>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Actions">
                    <Button label="Click" id={'menu-click-button'} onClick={() => onClickChange()}/>
                    {
                        selectedElement && utils.isInputText(selectedElement) ?
                            <Button label="Type" onClick={() => onType()}/> : ""
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
