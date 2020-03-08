import { hyphenate } from "./hyphenateRE";
//设置style对象时，先json深拷贝
export function objtostylestring(obj: object): string {
    //style属性的驼峰转横杠
    obj = JSON.parse(JSON.stringify(obj));
    const objentries = Object.entries(obj).map(([key, value]) => [
        hyphenate(key).trim(),
        value
    ]);
    return objentries.map(([key, value]) => key + ":" + value).join(";");
}
