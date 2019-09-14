function isobject(a: any) {
  return typeof a === "object" && a !== null;
}
function isstring(a: any) {
  return typeof a === "string";
}

// function inputandtextareaagent(ele) {
//   asserthtmlelement(ele);
//   if (
//     (ele.tagName === "INPUT" && ele.type === "text") ||
//     ele.tagName === "TEXTAREA"
//   ) {
//     return new Proxy(ele, {
//       ownKeys() {},
//       set() {},
//       has() {},
//       get() {}
//     });
//   } else {
//     return ele;
//   }
// }



function objtostylestring(o:object):string{

return Object.entries(o).map(([key,value])=>key+":"+value).join(";")
}
function asserthtmlelement(ele: any) {
  if (
    !(
      ele instanceof HTMLElement ||
      ele instanceof SVGElement ||
      ele instanceof Element
    )
  ) {
    throw TypeError("invalid HTMLElement!");
  } else return true;
}
export default function createeleattragentreadwrite(
  ele: HTMLElement | SVGElement | Element | HTMLInputElement
): object {
  //   if (
  //     !(
  //       ele instanceof HTMLElement ||
  //       ele instanceof SVGElement ||
  //       ele instanceof Element
  //     )
  //   ) {
  //     throw TypeError("invalid HTMLElement!");
  //   }
  asserthtmlelement(ele);

  const isinputtextortextarea =
    (ele.tagName === "INPUT" && Reflect.get(ele, "type") === "text") ||
    ele.tagName === "TEXTAREA";

  var temp: object = Object.create(null);
  return new Proxy(temp, {
    ownKeys(/* target */) {
      const keys = Reflect.ownKeys(ele.attributes).filter(
        k => !/\d/.test(String(k)[0])
      );
      return isinputtextortextarea
        ? Array.from(new Set([...keys, "value"]))
        : keys;
    },
    get(target, key) {
      if (isinputtextortextarea && key === "value") {
        return Reflect.get(ele, "value");
      } else {
        var v = ele.getAttribute(String(key));
        //   console.log(v);
        if (!v) {
          return;
        }
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
      if (isinputtextortextarea && key === "value") {
        return Reflect.set(ele, "value", v);
      } else {
        ele.setAttribute(
          String(key),
          isobject(v) ? JSON.stringify(v) : String(v)
        );
        return true;
      }
    },
    deleteProperty(t, k) {
      ele.removeAttribute(String(k));
      return true;
    },
    has(target, key) {
      if (isinputtextortextarea && key === "value") {
        return true;
      } else {
        return ele.hasAttribute(String(key));
      }
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
      if (isinputtextortextarea && key === "value") {
        return {
          value: Reflect.get(ele, "value"),
          ...otherdescipter
          //   enumerable: true,
          //   configurable: true,
          //   writable: true
        };
      } else {
        var attr = ele.getAttribute(String(key));
        if (attr) {
          return {
            value: attr,
            ...otherdescipter
            // enumerable: true,
            // configurable: true,
            // writable: true
          };
        } else {
          return;
        }
      }
    },
  /*  setPrototypeOf() {
      return false;
    },
    getPrototypeOf() {
      return null;
    }*/
  });
}