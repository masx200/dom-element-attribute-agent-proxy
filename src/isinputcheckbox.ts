import { geteletagname } from "./geteletagname";
import { get } from "src/util";
export const isinputcheckbox = (
    ele: HTMLElement | Element | SVGElement | HTMLInputElement
) =>
    "input" === geteletagname(ele) &&
    (get(ele, "type") === "checkbox" || get(ele, "type") === "radio");
