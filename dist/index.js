const Reflect = window.Reflect;

const {get: get, ownKeys: ownKeys, set: set} = Reflect;

const valuestring = "value";

function isobject(a) {
    return typeof a === "object" && a !== null;
}

function isstring(a) {
    return typeof a === "string";
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
    return new Proxy(temp, {
        ownKeys() {
            const keys = attributesownkeys(ele);
            return isinputtextortextareaflag ? Array.from(new Set([ ...keys, valuestring ])) : keys;
        },
        get(target, key) {
            if (isinputtextortextareaflag && key === valuestring) {
                return get(ele, valuestring);
            } else {
                const v = getattribute(ele, String(key));
                if (!v) {
                    return;
                }
                if (v === "") {
                    return true;
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
            } else {
                if (v === true) {
                    v = "";
                }
                setattribute(ele, String(key), isobject(v) ? JSON.stringify(v) : String(v));
                return true;
            }
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
            if (isinputtextortextareaflag && key === valuestring) {
                return {
                    value: get(ele, valuestring),
                    ...otherdescipter
                };
            } else {
                const attr = getattribute(ele, String(key));
                let outvalue;
                if (attr === "") {
                    outvalue = true;
                }
                if (outvalue) {
                    return {
                        value: outvalue,
                        ...otherdescipter
                    };
                } else {
                    return;
                }
            }
        }
    });
}

function attributesownkeys(ele) {
    return ownKeys(ele.attributes).filter(k => !/\d/.test(String(k)[0]));
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
