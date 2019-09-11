export default function createeleattragentreadwrite(ele) {
    var temp = Object.create(null);
    return new Proxy(temp, {
        ownKeys(target) {
            return Reflect.ownKeys(ele.attributes).filter(k => !/\d/.test(k[0]));
        },
        get(target, key) {
            return ele.getAttribute(key);
        },
        set(t, key, v) {
            ele.setAttribute(key, v);
            return true;
        },
        deleteProperty(t, k) {
            ele.removeAttribute(k);
            return true;
        },
        has(target, key) {
            return ele.hasAttribute(key);
        },
        defineProperty() {
            return false;
        },
        getOwnPropertyDescriptor(target, key) {
            var attr = ele.getAttribute(key);
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
