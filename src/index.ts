import { asserthtmlelement } from "./asserthtmlelement";
import { Attrhandler } from "./Attrhandler";
export default function createeleattragentreadwrite(ele: Element): Record<string, any> {
    asserthtmlelement(ele);
    var temp: Record<string, any> = Object.create(null);
    const handler: ProxyHandler<any> = new Attrhandler(ele);
    const outputattrs: Record<string, any> = new Proxy(temp, handler);
    return outputattrs;
}
