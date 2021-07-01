
export const getClosestParent = (elem, selector = '[id]') => {
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

