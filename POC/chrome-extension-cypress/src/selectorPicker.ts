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
    document.addEventListener('click', function (event) {
        const selector = 'data-testid';
        const parent = getClosestParent(event.target, `[${selector}]`);
        const firstTag = parent.elem.getAttribute([selector]);
        const firstSelector = firstTag ? `[${selector}='${firstTag}']` : 'BODY'
        console.log(`${firstSelector} ${parent.tags.split(' ').reverse().join(' ')}`);
    }, false);
}