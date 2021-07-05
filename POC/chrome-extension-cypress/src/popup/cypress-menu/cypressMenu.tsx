import React, {useEffect, useState} from 'react';
import './cypress-menu.scss';
import * as ReactDOM from "react-dom";
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {useSelector} from "../../selectorPicker";
import "./cypress-menu.scss";
import {TabPanel, TabView} from "primereact/tabview";

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

const computedStyle = [
    {label: 'Background color', value: 'background-color'},
    {label: 'Color', value: 'color'},
    {label: 'Width', value: 'width'},
    {label: 'Height', value: 'height'}
];
const CypressMenu = () => {
    const [selectType, _setSelectType] = useState<any>(null);
    const [cySelector, setCySelector] = useState<any>('');
    const [menu, setMenu] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedStyle, setSelectedStyle] = useState('');
    const typeRef = React.useRef(selectType);

    const setSelectType = data => {
        typeRef.current = data;
        _setSelectType(data);
    };

    useEffect(() => {

        document.addEventListener('click', (e) => {
            setCySelector(useSelector(e).cySelector);
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

    const generateCode = (template) => {
        let generatedCode;
        chrome.storage.local.get(/* String or Array */["selector", "generatedCode"], (items) => {
            console.log(items);
            if (items?.generatedCode) {
                generatedCode = items['generatedCode']
            }
            const clickedSelector = items['selector'];
            chrome.storage.local.set(
                {
                    "selector": clickedSelector, "generatedCode":
                        `${generatedCode ? generatedCode + '\n' : ''}${template.replace('{0}', clickedSelector.cySelector).replace('{1}', clickedSelector.value)
                            .replace('{2}', clickedSelector.text)}`
                },
                function () {
                    //  Data's been saved boys and girls, go on home
                });
            console.log(clickedSelector);
        });
    }

    const onClickChange = () => {
        setSelectType('click')
        generateCode(`cy.get("${cySelector}").click();`);
        displayMenu();
    }
    const onType = () => {
        setSelectType('type');
        generateCode(`cy.get("${cySelector}").type("{1}");`);
        displayMenu();
    }
    const onContains = () => {
        setSelectType('contains');
        generateCode(`cy.get("${cySelector}").contains("{2}")`);
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
                    generateCode(`cy.get(${cySelector}).should("${e.value}", "${value}");`);
                }
                break;
            case "have.css":
                toggleView = null;
                break;
            case "have.length":
                if (document.querySelector(cySelector).value) {
                    value = document.querySelector(cySelector).value.length;
                    generateCode(`cy.get(${cySelector}).should("${e.value}", "${value}");`);
                }
                break;
            default:
                generateCode(`cy.get(${cySelector}).should("${e.value}");`);
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
        generateCode(`cy.get(${cySelector}).should("${selectType}", "${e.value}", "${value}");`);
        displayMenu();
    }
    return ReactDOM.createPortal(<section id={id}>
        <div className={`menu-container ${menu ? 'show-menu' : 'hide-menu'}`} onClick={onContainerClick}>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Actions">
                    <Button label="Click" onClick={() => onClickChange()}/>
                    <Button label="Type" onClick={() => onType()}/>
                    <Button label="Contains" onClick={() => onContains()}/>
                </TabPanel>
                <TabPanel header="Assertions">
                    <Dropdown value={selectType} options={types} onChange={onTypeChange} placeholder="Should..."
                              data-type="assert-selector"/>
                    {
                        selectType === "have.css" ?
                            <Dropdown value={selectedStyle} options={computedStyle} onChange={onComputedStyleChange}
                                      placeholder="Select style..."/> : ""
                    }
                </TabPanel>
            </TabView>
        </div>
    </section>, document.body);
}

export default CypressMenu;
