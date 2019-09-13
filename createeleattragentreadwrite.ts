function isobject(a: any) {
  return typeof a === "object" && a !== null;
}
function isstring(a: any) {
  return typeof a === "string";
}
export default function createeleattragentreadwrite(
  ele: HTMLElement | SVGSVGElement
): object {
  if (!(ele instanceof HTMLElement || ele instanceof SVGSVGElement)) {
    throw TypeError("invalid HTMLElement!");
  }
  var temp: object = Object.create(null);
  return new Proxy(temp, {
    ownKeys(/* target */) {
      return Reflect.ownKeys(ele.attributes).filter(
        k => !/\d/.test(String(k)[0])
      );
    },
    get(target, key) {
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
    },
    set(t, key, v) {
      ele.setAttribute(
        String(key),
        isobject(v) ? JSON.stringify(v) : String(v)
      );
      return true;
    },
    deleteProperty(t, k) {
      ele.removeAttribute(String(k));
      return true;
    },
    has(target, key) {
      return ele.hasAttribute(String(key));
    },
    defineProperty() {
      return false;
    },
    getOwnPropertyDescriptor(target, key) {
      var attr = ele.getAttribute(String(key));
      if (attr) {
        return {
          value: attr,
          enumerable: true,
          configurable: true,
          writable: true
        };
      } else {
        return;
      }
    },
    setPrototypeOf() {
      return false;
    },
    getPrototypeOf() {
      return null;
    }
  });
}
