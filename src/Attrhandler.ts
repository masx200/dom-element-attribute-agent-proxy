import mustUseDomProp from "./mustUseDomProp";
import { isArray } from "./isArray";
import { isstring } from "./isstring";
import { isobject } from "./isobject";
import { isSet } from "./isSet";
import { isinputcheckbox } from "./isinputcheckbox";
import { objtostylestring } from "./objtostylestring";
import { attributesownkeys } from "./attributesownkeys";
import { getattribute } from "./getattribute";
import { geteletagname } from "./geteletagname";
import { setattribute } from "./setattribute";
import { removeAttribute } from "./removeAttribute";
import { isinputtextortextarea } from "./isinputtextortextarea";
import { hasAttribute } from "./hasAttribute";
import { valuestring, String, get, set } from './util';
export class Attrhandler {
    constructor(ele: Element) {
        this.#ele = ele;
        const proto=Attrhandler.prototype
        Reflect.ownKeys(proto).forEach(k=>{
            let f=get(proto,k)
            if(typeof f=='function'){
                set(this,k,f.bind(this))
            }
        })
    }
    #ele: Element;
    ownKeys( /* target */) {
        const ele=this.#ele
        const isinputtextortextareaflag = isinputtextortextarea(ele);
        const keys = attributesownkeys(ele);
        return Array.from(new Set([
            ...keys,
            isinputcheckbox(ele) ? "checked" : undefined,
            isinputtextortextareaflag ? valuestring : undefined
            //Array.from(new Set([...keys, valuestring]))
            //  : keys
        ]
            .flat(Infinity)
            .filter(a => !!a)));
    }
    get(_target: any, key: string) {
        const ele=this.#ele
        //   const isinputtextortextareaflag = isinputtextortextarea(ele);
        //   if (isinputcheckbox(ele) && key === "checked") {
        //     return get(ele, "checked");
        //   }
        //   if (isinputtextortextareaflag && key === valuestring) {
        //     return get(ele, valuestring);
        //   }
        if (mustUseDomProp(geteletagname(ele), String(key), get(ele, "type"))) {
            return get(ele, String(key));
        }
        else {
            const v = getattribute(ele, String(key));
            // ele.getAttribute(String(key));
            //   console.log(v);
            if (v === "") {
                return true;
            }
            /* 修复属性空字符串返回不是true的bug问题 */
            if (v === null) {
                return;
            }
            //如果属性空字符串则返回true
            if (isstring(v)) {
                try {
                    return JSON.parse(String(v)); // v
                }
                catch (error) {
                    return v;
                }
            }
            else
                return;
        }
    }
    set(_t: any, key: string, v: any) {
        const ele=this.#ele
        //   const isinputtextortextareaflag = isinputtextortextarea(ele);
        //不允许设置属性为函数
        if ("function" === typeof v) {
            console.error(v);
            console.error("Setting properties as functions is not allowed");
            throw TypeError();
            // throw TypeError("不允许设置属性为函数");
        }
        /* 对于input的checkbox设置 checked属性时,不添加属性,直接修改checked属性*/
        /*  if (geteletagname(ele) === "input" && key === "checked") {
    set(ele, key, v);
    return true;
  }

  if (isinputtextortextareaflag && key === valuestring) {
    //设置元素的value属性,转成字符串
    return set(ele, valuestring, String(v));
  }  */
        if (mustUseDomProp(geteletagname(ele), String(key), get(ele, "type"))) {
            return set(ele, String(key), v);
        }
        else if (key === "style") {
            const csstext = isstring(v)
                ? v
                : isobject(v)
                    ? objtostylestring(v)
                    : String(v);
            //设置csstext可以删除注释
            set(get(ele, "style"), "cssText", csstext.trim());
            // ele.style.cssText = csstext.trim();
            //    setattribute(
            //      ele,
            //       String(key),
            //      isstring(v) ? v : isobject(v) ? objtostylestring(v) : String(v)
            //     );
            /*   ele.setAttribute(
      String(key),
      isstring(v) ? v : isobject(v) ? objtostylestring(v) : String(v)
    ); */
            return true;
        }
        else if (key === "class" && isobject(v)) {
            const classtext = isArray(v)
                ? v.join(" ")
                : isSet(v)
                    ? [...v].join(" ")
                    : String(v);
            setattribute(ele, String(key), classtext);
            return true;
            /*  if (isArray(v)) {
      setattribute(ele, String(key), v.join(" "));
    } else if (isSet(v)) {
      setattribute(ele, String(key), [...v].join(" "));
    } else {
      setattribute(ele, String(key), String(v));
    }*/
            //
        }
        else {
            /* 如果为false则删除attribute */
            if (false === v || v === null || v === undefined) {
                removeAttribute(ele, String(key));
                return true;
            }
            //如果设置为true,则设置属性空字符串
            if (isSet(v)) {
                setattribute(ele, String(key), JSON.stringify([...v]));
                return true;
            }
            else {
                if (v === true) {
                    v = "";
                }
                setattribute(ele, String(key), isobject(v) ? JSON.stringify(v) : String(v));
                /*  ele.setAttribute(
      String(key),
      isobject(v) ? JSON.stringify(v) : String(v)
    ); */
                return true;
            }
        }
        //   return true;
    }
    deleteProperty(_t: any, k: string) {
        const ele=this.#ele
        removeAttribute(ele, String(k));
        // ele.removeAttribute(String(k));
        return true;
    }
    has(_target: any, key: string) {
        const ele=this.#ele
        return hasAttribute(ele, String(key));
        // return ownKeys(outputattrs).includes(key);
        /*
const isinputtextortextareaflag = isinputtextortextarea(ele);

  if (isinputtextortextareaflag && key === valuestring) {
    return true;
  } else {
    return hasAttribute(ele, String(key));

    // ele.hasAttribute(String(key));
  }

*/
    }
    defineProperty() {
        return false;
    }
    getOwnPropertyDescriptor(_target: any, key: string) {
        const ele=this.#ele
        const otherdescipter = {
            enumerable: true,
            configurable: true,
            writable: true
        };
        // const myvalue: any = get(outputattrs, key);
        const myvalue = getattribute(ele, String(key));
        if (typeof myvalue !== "undefined") {
            return {
                value: myvalue,
                ...otherdescipter
            };
        }
        else {
            return;
        }
        /*  if (isinputtextortextareaflag && key === valuestring) {
    return {
      value: get(ele, valuestring),
      ...otherdescipter
      //   enumerable: true,
      //   configurable: true,
      //   writable: true
    };
  } else {
    const attr = getattribute(ele, String(key));
    // ele.getAttribute(String(key));

    //如果属性空字符串则返回true
    let outvalue;
    if (attr === "") {
      outvalue = true;
    }
    if (outvalue) {
      return {
        value: outvalue,
        ...otherdescipter
        // enumerable: true,
        // configurable: true,
        // writable: true
      };
    } else {
      return;
    }
  } */
    }
    setPrototypeOf() {
        return false;
    }
}
