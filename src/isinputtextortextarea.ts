import { geteletagname } from "./geteletagname";
import { get } from "src/util";
export function isinputtextortextarea(
    ele: HTMLElement | Element | SVGElement | HTMLInputElement
) {
    const tagname = geteletagname(ele);
    return (
        tagname === "textarea" ||
        tagname === "select" ||
        (tagname === "input" && get(ele, "type") === "text")
        /* 添加select元素 */
    );
}
