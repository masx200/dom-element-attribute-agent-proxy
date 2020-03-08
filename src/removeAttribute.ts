export function removeAttribute(
    ele: HTMLElement | Element | SVGElement | HTMLInputElement,
    key: string
) {
    return ele.removeAttribute(key);
}
