export function setattribute(
    ele: HTMLElement | Element | SVGElement | HTMLInputElement,
    key: string,
    value: string
) {
    return ele.setAttribute(key, value);
}
