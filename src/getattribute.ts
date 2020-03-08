export function getattribute(
    ele: HTMLElement | Element | SVGElement | HTMLInputElement,
    key: string
) {
    return ele.getAttribute(key);
}
