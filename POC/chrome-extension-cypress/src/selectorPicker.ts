export const selectorPicker = () => {
    const getClosestParent = (elem, selector = '[id]') => {
        let tags = '', lastChlid = '';

        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector) || document.body === elem) {
                return {
                    elem: elem,
                    tags: tags,
                }
            } else {
                let index = [].indexOf.call(elem.parentNode.children, elem) + 1;
                tags += elem.tagName + ':nth-child('+index+') ';
            }
        }
        return null;
    };

    const useSelector = () => {
        const selector = 'data-testid';
        const parent = getClosestParent(event.target, `[${selector}]`);
        const firstTag = parent.elem.getAttribute([selector]);
        const firstSelector = firstTag ? `[${selector}='${firstTag}']` : 'BODY';
        const cySelector = `${firstSelector} ${parent.tags.split(' ').reverse().join(' ')}`
        console.log(cySelector);
        const innerText = document.querySelector(cySelector).textContent;
        const color = window.getComputedStyle(document.querySelector(cySelector)).color
        console.log(`cy.get(${cySelector}).contain('have.text', '${innerText}')`);
        console.log(`cy.get(${cySelector}).contain('have.css', 'color, '${color}')`);
    };
    document.addEventListener('click', useSelector, false);
    document.addEventListener('change', useSelector, false);
}