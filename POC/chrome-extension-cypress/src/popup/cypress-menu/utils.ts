const formElements: Set<string> = new Set([
    "input",
    "label",
    "select",
    "textarea",
    "button",
    "fieldset",
    "legend",
    "datalist",
    "output",
    "option",
    "optgroup",
]);

export const isFormElement = (elem: HTMLElement): boolean  => {
    return formElements.has(elem.tagName.toLowerCase());
}

export const isInputText = (elem: HTMLElement): boolean  => {
    const tagName = elem.tagName.toLowerCase();
    return isFormElement(elem) && (elem.tagName === 'textarea' || (tagName === 'input' && elem.getAttribute('type') === 'text'));
}

export const isCanCheck = (elem: HTMLElement): boolean  => {
    const tagName = elem.tagName.toLowerCase();
    return isFormElement(elem) &&
        tagName === 'input' &&
        (elem.getAttribute('type') === 'checkbox' || elem.getAttribute('type') === 'radio');
}

export const generateCode = (template: string): void => {
    chrome.storage.local.get(["selector", "generatedCode"], (items) => {
        const clickedSelector = items['selector'];
        let generatedCode = items['generatedCode'];
        console.log(generatedCode);
        if (items?.generatedCode) {
            generatedCode[0] = `${generatedCode[0] ? generatedCode[0] + '\n' : ''}${template.replace('{0}', clickedSelector.cySelector).replace('{1}', clickedSelector.value)
              .replace('{2}', clickedSelector.text)}`
        }

        chrome.storage.local.set(
            {
                "selector": clickedSelector, "generatedCode":generatedCode

            },
            function () {
                //  Data's been saved boys and girls, go on home
            });
    });
}
