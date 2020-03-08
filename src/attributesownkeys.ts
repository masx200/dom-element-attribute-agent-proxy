export function attributesownkeys(
    ele: HTMLElement | Element | SVGElement | HTMLInputElement
): string[] {
    //   return ownKeys(ele.attributes).filter(k => !/\d/.test(String(k)[0]));
    return ele.getAttributeNames();
}
