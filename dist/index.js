const Reflect = window.Reflect;

const {get: get, set: set} = Reflect;

const valuestring = "value";

function isobject(a) {
    return typeof a === "object" && a !== null;
}

function isstring(a) {
    return typeof a === "string";
}

function isArray(a) {
    return Array.isArray(a);
}

function isSet(a) {
    return a instanceof Set;
}

function objtostylestring(o) {
    return Object.entries(o).map(([key, value]) => key + ":" + value).join(";");
}

function asserthtmlelement(ele) {
    if (!(ele instanceof Element)) {
        throw TypeError("invalid HTMLElement!");
    } else return true;
}

function createeleattragentreadwrite(ele) {
    asserthtmlelement(ele);
    const isinputtextortextareaflag = isinputtextortextarea(ele);
    var temp = Object.create(null);
    const outputattrs = new Proxy(temp, {
        ownKeys() {
            const keys = attributesownkeys(ele);
            return isinputtextortextareaflag ? Array.from(new Set([ ...keys, valuestring ])) : keys;
        },
        get(target, key) {
            if (isinputtextortextareaflag && key === valuestring) {
                return get(ele, valuestring);
            } else {
                const v = getattribute(ele, String(key));
                if (v === "") {
                    return true;
                }
                if (v === null) {
                    return;
                }
                if (isstring(v)) {
                    try {
                        return JSON.parse(String(v));
                    } catch (error) {
                        return v;
                    }
                } else return;
            }
        },
        set(t, key, v) {
            if (isinputtextortextareaflag && key === valuestring) {
                return set(ele, valuestring, v);
            } else if (key === "style") {
                setattribute(ele, String(key), isstring(v) ? v : isobject(v) ? objtostylestring(v) : String(v));
                return true;
            } else if (key === "class" && isobject(v)) {
                if (isArray(v)) {
                    setattribute(ele, String(key), v.join(" "));
                } else if (isSet(v)) {
                    setattribute(ele, String(key), [ ...v ].join(" "));
                } else {
                    setattribute(ele, String(key), JSON.stringify(v));
                }
            } else {
                if (v === true) {
                    v = "";
                }
                setattribute(ele, String(key), isobject(v) ? JSON.stringify(v) : String(v));
                return true;
            }
            return true;
        },
        deleteProperty(t, k) {
            removeAttribute(ele, String(k));
            return true;
        },
        has(target, key) {
            if (isinputtextortextareaflag && key === valuestring) {
                return true;
            } else {
                return hasAttribute(ele, String(key));
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
            const myvalue = get(outputattrs, key);
            if (typeof myvalue !== "undefined") {
                return {
                    value: myvalue,
                    ...otherdescipter
                };
            } else {
                return;
            }
        }
    });
    return outputattrs;
}

function attributesownkeys(ele) {
    return ele.getAttributeNames();
}

function getattribute(ele, key) {
    return ele.getAttribute(key);
}

function geteletagname(ele) {
    return ele.tagName.toLowerCase();
}

function setattribute(ele, key, value) {
    return ele.setAttribute(key, value);
}

function removeAttribute(ele, key) {
    return ele.removeAttribute(key);
}

function hasAttribute(ele, key) {
    return ele.hasAttribute(key);
}

function isinputtextortextarea(ele) {
    const tagname = geteletagname(ele);
    return tagname === "input" && get(ele, "type") === "text" || tagname === "textarea";
}

export default createeleattragentreadwrite;
//# sourceMappingURL=index.js.map
