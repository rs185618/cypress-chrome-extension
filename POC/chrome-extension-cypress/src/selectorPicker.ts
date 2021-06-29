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
export const selectorPicker = (doc) => {
    doc.addEventListener('click', function (event) {
        alert('event.currentTarget ' + event.target)
        const selector = 'data-testid';
        const parent = getClosestParent(event.target, `[${selector}]`);
        console.log(`[${selector}='${parent.elem.getAttribute([selector])}'] ${parent.tags.split(' ').reverse().join(' ')}`);
    }, false);
    return '';
}
