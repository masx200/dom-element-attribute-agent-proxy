const valuestring = "value";
function isobject(a) {
    return typeof a === "object" && a !== null;
}
function isstring(a) {
    return typeof a === "string";
}
function objtostylestring(o) {
    return Object.entries(o)
        .map(([key, value]) => key + ":" + value)
        .join(";");
}
function asserthtmlelement(ele) {
    if (!(ele instanceof HTMLElement ||
        ele instanceof SVGElement ||
        ele instanceof Element)) {
        throw TypeError("invalid HTMLElement!");
    }
    else
        return true;
}
function createeleattragentreadwrite(ele) {
    asserthtmlelement(ele);
    const isinputtextortextarea = (ele.tagName === "INPUT" && Reflect.get(ele, "type") === "text") ||
        ele.tagName === "TEXTAREA";
    var temp = Object.create(null);
    return new Proxy(temp, {
        ownKeys() {
            const keys = Reflect.ownKeys(ele.attributes).filter(k => !/\d/.test(String(k)[0]));
            return isinputtextortextarea
                ? Array.from(new Set([...keys, valuestring]))
                : keys;
        },
        get(target, key) {
            if (isinputtextortextarea && key === valuestring) {
                return Reflect.get(ele, valuestring);
            }
            else {
                var v = ele.getAttribute(String(key));
                if (!v) {
                    return;
                }
                if (isstring(v)) {
                    try {
                        return JSON.parse(String(v));
                    }
                    catch (error) {
                        return v;
                    }
                }
                else
                    return;
            }
        },
        set(t, key, v) {
            if (isinputtextortextarea && key === valuestring) {
                return Reflect.set(ele, valuestring, v);
            }
            else if (key === "style") {
                ele.setAttribute(String(key), isstring(v) ? v : isobject(v) ? objtostylestring(v) : String(v));
                return true;
            }
            else {
                ele.setAttribute(String(key), isobject(v) ? JSON.stringify(v) : String(v));
                return true;
            }
        },
        deleteProperty(t, k) {
            ele.removeAttribute(String(k));
            return true;
        },
        has(target, key) {
            if (isinputtextortextarea && key === valuestring) {
                return true;
            }
            else {
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
            if (isinputtextortextarea && key === valuestring) {
                return {
                    value: Reflect.get(ele, valuestring),
                    ...otherdescipter
                };
            }
            else {
                var attr = ele.getAttribute(String(key));
                if (attr) {
                    return {
                        value: attr,
                        ...otherdescipter
                    };
                }
                else {
                    return;
                }
            }
        }
    });
}

export default createeleattragentreadwrite;
//# sourceMappingURL=index.js.map
