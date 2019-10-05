const String = window.String;
const Reflect = window.Reflect;
const { get, set ,ownKeys} = Reflect;
const valuestring = "value";
function isobject(a: any): a is object {
  return typeof a === "object" && a !== null;
}
function isstring(a: any): a is string {
  return typeof a === "string";
}
function isArray(a: any): a is Array<any> {
  return Array.isArray(a);
}

function isSet(a: any): a is Set<any> {
  return a instanceof Set;
}

const isinputcheckbox =ele=>
    "input" === geteletagname(ele) && get(ele, "type") === "checkbox";

//设置style对象时，先json深拷贝
function objtostylestring(o: object): string {
  return (

Object.entries(
JSON.parse(
JSON.stringify(

o
))
)
    .map(([key, value]) => key + ":" + value)
    .join(";")
)
}
function asserthtmlelement(ele: any) {
  if (
    
   ! (ele instanceof Element)
  ) {
    throw TypeError("invalid HTMLElement!");
  } 
}
export default function createeleattragentreadwrite(
  ele: HTMLElement | SVGElement | Element | HTMLInputElement
): object {
  
  asserthtmlelement(ele);

  
  
  var temp: object = Object.create(null);

  const outputattrs = new Proxy(temp, {
    ownKeys(/* target */) {
const isinputtextortextareaflag = isinputtextortextarea(ele);
  
      const keys = attributesownkeys(ele);
      
      return Array.from(
        new Set(
          [...keys,
            isinputcheckbox(ele) ? "checked" : undefined,
            isinputtextortextareaflag
             ? valuestring:undefined
//Array.from(new Set([...keys, valuestring]))
            //  : keys
          ]
            .flat(Infinity)
            .filter(a => !!a)
        )
      );
    },
    get(target, key) {

const isinputtextortextareaflag = isinputtextortextarea(ele);
  

      if (isinputcheckbox(ele) && key === "checked") {
        return get(ele, "checked");
      }
      if (isinputtextortextareaflag && key === valuestring) {
        return get(ele, valuestring);
      } else {
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
          } catch (error) {
            return v;
          }
        } else return;
      }
    },
    set(t, key, v) {
const isinputtextortextareaflag = isinputtextortextarea(ele);
  

      //不允许设置属性为函数
      if ("function" === typeof v) {
        console.error(v);
        throw TypeError("Setting properties as functions is not allowed");

        // throw TypeError("不允许设置属性为函数");
      }
      /* 对于input的checkbox设置 checked属性时,不添加属性,直接修改checked属性*/
      if (geteletagname(ele) === "input" && key === "checked") {
        set(ele, key, v);
        return true;
      }

      if (isinputtextortextareaflag && key === valuestring) {
        return set(ele, valuestring, v);
      } else if (key === "style") {
const csstext=isstring(v) ? v : isobject(v) ? objtostylestring(v) : String(v)
//设置csstext可以删除注释

ele.style.cssText=csstext

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
      } else if (key === "class" && isobject(v)) {



const classtext=isArray(v)?v.join(" "):isSet(v)?[...v].join(" "):String(v)

setattribute(ele, String(key), classtext)

      /*  if (isArray(v)) {
          setattribute(ele, String(key), v.join(" "));
        } else if (isSet(v)) {
          setattribute(ele, String(key), [...v].join(" "));
        } else {
          setattribute(ele, String(key), String(v));
        }*/
        //
      } else {
        //如果设置为true,则设置属性空字符串
        if (isSet(v)) {
          setattribute(ele, String(key), JSON.stringify([...v]));
        } else {
          if (v === true) {
            v = "";
          }

          setattribute(
            ele,
            String(key),
            isobject(v) ? JSON.stringify(v) : String(v)
          );
          /*  ele.setAttribute(
          String(key),
          isobject(v) ? JSON.stringify(v) : String(v)
        ); */
          return true;
        }
      }
      return true;
    },
    deleteProperty(t, k) {
      removeAttribute(ele, String(k));
      // ele.removeAttribute(String(k));
      return true;
    },
    has(target, key) {
return ownKeys(outputattrs).includes(key)
/*
const isinputtextortextareaflag = isinputtextortextarea(ele);
  
      if (isinputtextortextareaflag && key === valuestring) {
        return true;
      } else {
        return hasAttribute(ele, String(key));

        // ele.hasAttribute(String(key));
      }

*/
    },
    defineProperty() {
      return false;
    },
    getOwnPropertyDescriptor(target, key) {
      const otherdescipter = {
        enumerable: true,
        configurable: true,
        writable: true
      };
      const myvalue: any = get(outputattrs, key);
      if (typeof myvalue !== "undefined") {
        return {
          value: myvalue,
          ...otherdescipter
        };
      } else {
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
    },
    setPrototypeOf() {
      return false;
    }
    /*  setPrototypeOf() {
      return false;
    },
    getPrototypeOf() {
      return null;
    }*/
  });
  return outputattrs;
}
function attributesownkeys(
  ele: HTMLElement | Element | SVGElement | HTMLInputElement
): string[] {
  //   return ownKeys(ele.attributes).filter(k => !/\d/.test(String(k)[0]));
  return ele.getAttributeNames();
}
function getattribute(
  ele: HTMLElement | Element | SVGElement | HTMLInputElement,
  key: string
) {
  return ele.getAttribute(key);
}
function geteletagname(ele: Element /* { tagName: string } */) {
  return ele.tagName.toLowerCase();
}
function setattribute(
  ele: HTMLElement | Element | SVGElement | HTMLInputElement,
  key: string,
  value: string
) {
  return ele.setAttribute(key, value);
}
function removeAttribute(
  ele: HTMLElement | Element | SVGElement | HTMLInputElement,
  key: string
) {
  return ele.removeAttribute(key);
}

function hasAttribute(
  ele: HTMLElement | Element | SVGElement | HTMLInputElement,
  key: string
) {
  return ele.hasAttribute(key);
}

function isinputtextortextarea(
  ele: HTMLElement | Element | SVGElement | HTMLInputElement
) {
  const tagname = geteletagname(ele);
  return (
    (tagname === "input" && get(ele, "type") === "text") ||
    tagname === "textarea"
  );
}
