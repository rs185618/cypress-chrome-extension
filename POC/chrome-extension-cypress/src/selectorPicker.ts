
export const selectorPicker = () => {
    const getClosestParent = (elem, selector = '[id]') => {
        let tags = '';
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector)) {
                return {
                    elem: elem,
                    tags: tags
                }
            } else {
                tags += elem.tagName + ' ';
            }
        }
        return null;
    };
    document.addEventListener('click', function (event) {
        const selector = 'data-testid';
        const parent = getClosestParent(event.target, `[${selector}]`);
        console.log(`[${selector}='${parent.elem.getAttribute([selector])}'] ${parent.tags.split(' ').reverse().join(' ')}`);
    }, false);
}

