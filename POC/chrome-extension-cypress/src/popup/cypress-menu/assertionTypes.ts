import * as utils from "./utils";

const commonTypes = [
    {label: 'Be Visible', value: 'be.visible'},
    {label: 'Be Hidden', value: 'not.be.visible'},
    {label: 'Exist', value: 'exist'},
    {label: 'Not Exist', value: 'not.exist'},
    {label: 'Be Disabled', value: 'be.disabled'},
    {label: 'Not Be Disabled', value: 'not.be.disabled'},
    {label: 'Css', value: 'have.css'},
];
const formTypes = [
    {label: 'Have Value', value: 'have.value'},
    {label: 'Have length', value: 'have.length'},

];
const checkedTypes = [
    {label: 'Be Checked', value: 'be.checked'},
    {label: 'Not Be Checked', value: 'not.be.checked'},
];

const getElementAssertions = (elem: HTMLElement) => {
    let types = commonTypes;
    if(elem){
        if(utils.isCanCheck(elem))
            types = types.concat(checkedTypes);
        if(utils.isFormElement(elem))
            types = types.concat(formTypes);
    }
    return types;
}

export default getElementAssertions;
