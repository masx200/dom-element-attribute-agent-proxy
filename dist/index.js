const hyphenateRE = /\B([A-Z])/g;

const hyphenate = str => {
    return str.replace(hyphenateRE, "-$1").toLowerCase();
};

const String = window.String;

const Reflect = window.Reflect;

const {get: get, set: set, ownKeys: ownKeys} = Reflect;

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

const isinputcheckbox = ele => "input" === geteletagname(ele) && get(ele, "type") === "checkbox";

function objtostylestring(obj) {
    obj = JSON.parse(JSON.stringify(obj));
    obj = Object.fromEntries(Object.entries(obj).map(([key, value]) => [ hyphenate(key).trim(), value ]));
    return Object.entries(obj).map(([key, value]) => key + ":" + value).join(";");
}

function asserthtmlelement(ele) {
    if (!(ele instanceof Element)) {
        console.error(ele);
        console.error("invalid HTMLElement!");
        throw TypeError();
    }
}

function createeleattragentreadwrite(ele) {
    asserthtmlelement(ele);
    var temp = Object.create(null);
    const outputattrs = new Proxy(temp, {
        ownKeys() {
            const isinputtextortextareaflag = isinputtextortextarea(ele);
            const keys = attributesownkeys(ele);
            return Array.from(new Set([ ...keys, isinputcheckbox(ele) ? "checked" : undefined, isinputtextortextareaflag ? valuestring : undefined ].flat(Infinity).filter(a => !!a)));
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
            const isinputtextortextareaflag = isinputtextortextarea(ele);
            if ("function" === typeof v) {
                console.error(v);
                console.error("Setting properties as functions is not allowed");
                throw TypeError();
            }
            if (geteletagname(ele) === "input" && key === "checked") {
                set(ele, key, v);
                return true;
            }
            if (isinputtextortextareaflag && key === valuestring) {
                return set(ele, valuestring, String(v));
            } else if (key === "style") {
                const csstext = isstring(v) ? v : isobject(v) ? objtostylestring(v) : String(v);
                set(get(ele, "style"), "cssText", csstext.trim());
                return true;
            } else if (key === "class" && isobject(v)) {
                const classtext = isArray(v) ? v.join(" ") : isSet(v) ? [ ...v ].join(" ") : String(v);
                setattribute(ele, String(key), classtext);
            } else {
                if (isSet(v)) {
                    setattribute(ele, String(key), JSON.stringify([ ...v ]));
                } else {
                    if (v === true) {
                        v = "";
                    }
                    setattribute(ele, String(key), isobject(v) ? JSON.stringify(v) : String(v));
                    return true;
                }
            }
            return true;
        },
        deleteProperty(t, k) {
            removeAttribute(ele, String(k));
            return true;
        },
        has(target, key) {
            return ownKeys(outputattrs).includes(key);
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
        },
        setPrototypeOf() {
            return false;
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

function isinputtextortextarea(ele) {
    const tagname = geteletagname(ele);
    return tagname === "textarea" || tagname === "select" || tagname === "input" && get(ele, "type") === "text";
}

export default createeleattragentreadwrite;
//# sourceMappingURL=index.js.map
