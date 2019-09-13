function isobject(a) {
    return typeof a === "object" && a !== null;
}
export default function createeleattragentreadwrite(ele) {
    if (!(ele instanceof HTMLElement)) {
        throw TypeError("invalid HTMLElement!");
    }
    var temp = Object.create(null);
    return new Proxy(temp, {
        ownKeys() {
            return Reflect.ownKeys(ele.attributes).filter(k => !/\d/.test(String(k)[0]));
        },
        get(target, key) {
            var v = ele.getAttribute(String(key));
            return isobject(v) ? v : JSON.parse(String(v));
        },
        set(t, key, v) {
            ele.setAttribute(String(key), isobject(v) ? JSON.stringify(v) : v);
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
            }
            else {
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
//# sourceMappingURL=createeleattragentreadwrite.js.map