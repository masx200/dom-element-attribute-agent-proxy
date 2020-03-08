function asserthtmlelement(ele) {
    if (!(ele instanceof Element)) {
        console.error(ele);
        console.error("invalid HTMLElement!");
        throw TypeError();
    }
}

const acceptValue = [ "input", "textarea", "option", "select" ];

var mustUseDomProp = (tag, attr, attrtype) => attr === "value" && acceptValue.includes(tag) && attrtype !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";

function isArray(a) {
    return Array.isArray(a);
}

function isstring(a) {
    return typeof a === "string";
}

function isobject(a) {
    return typeof a === "object" && a !== null;
}

function isSet(a) {
    return a instanceof Set;
}

function geteletagname(ele) {
    return ele.tagName.toLowerCase();
}

const String = window.String;

const Reflect$1 = window.Reflect;

const {get: get, set: set, ownKeys: ownKeys} = Reflect$1;

const valuestring = "value";

const isinputcheckbox = ele => "input" === geteletagname(ele) && (get(ele, "type") === "checkbox" || get(ele, "type") === "radio");

const hyphenateRE = /\B([A-Z])/g;

const hyphenate = str => str.replace(hyphenateRE, "-$1").toLowerCase();

function objtostylestring(obj) {
    obj = JSON.parse(JSON.stringify(obj));
    const objentries = Object.entries(obj).map(([key, value]) => [ hyphenate(key).trim(), value ]);
    return objentries.map(([key, value]) => key + ":" + value).join(";");
}

function attributesownkeys(ele) {
    return ele.getAttributeNames();
}

function getattribute(ele, key) {
    return ele.getAttribute(key);
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

function hasAttribute(ele, key) {
    return ele.hasAttribute(key);
}

var __classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};

var __classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};

var _ele;

class Attrhandler {
    constructor(ele) {
        _ele.set(this, void 0);
        __classPrivateFieldSet(this, _ele, ele);
        const proto = Attrhandler.prototype;
        Reflect.ownKeys(proto).forEach(k => {
            let f = get(proto, k);
            if (typeof f == "function") {
                set(this, k, f.bind(this));
            }
        });
    }
    ownKeys() {
        const ele = __classPrivateFieldGet(this, _ele);
        const isinputtextortextareaflag = isinputtextortextarea(ele);
        const keys = attributesownkeys(ele);
        return Array.from(new Set([ ...keys, isinputcheckbox(ele) ? "checked" : undefined, isinputtextortextareaflag ? valuestring : undefined ].flat(Infinity).filter(a => !!a)));
    }
    get(_target, key) {
        const ele = __classPrivateFieldGet(this, _ele);
        if (mustUseDomProp(geteletagname(ele), String(key), get(ele, "type"))) {
            return get(ele, String(key));
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
    }
    set(_t, key, v) {
        const ele = __classPrivateFieldGet(this, _ele);
        if ("function" === typeof v) {
            console.error(v);
            console.error("Setting properties as functions is not allowed");
            throw TypeError();
        }
        if (mustUseDomProp(geteletagname(ele), String(key), get(ele, "type"))) {
            return set(ele, String(key), v);
        } else if (key === "style") {
            const csstext = isstring(v) ? v : isobject(v) ? objtostylestring(v) : String(v);
            set(get(ele, "style"), "cssText", csstext.trim());
            return true;
        } else if (key === "class" && isobject(v)) {
            const classtext = isArray(v) ? v.join(" ") : isSet(v) ? [ ...v ].join(" ") : String(v);
            setattribute(ele, String(key), classtext);
            return true;
        } else {
            if (false === v || v === null || v === undefined) {
                removeAttribute(ele, String(key));
                return true;
            }
            if (isSet(v)) {
                setattribute(ele, String(key), JSON.stringify([ ...v ]));
                return true;
            } else {
                if (v === true) {
                    v = "";
                }
                setattribute(ele, String(key), isobject(v) ? JSON.stringify(v) : String(v));
                return true;
            }
        }
    }
    deleteProperty(_t, k) {
        const ele = __classPrivateFieldGet(this, _ele);
        removeAttribute(ele, String(k));
        return true;
    }
    has(_target, key) {
        const ele = __classPrivateFieldGet(this, _ele);
        return hasAttribute(ele, String(key));
    }
    defineProperty() {
        return false;
    }
    getOwnPropertyDescriptor(_target, key) {
        const ele = __classPrivateFieldGet(this, _ele);
        const otherdescipter = {
            enumerable: true,
            configurable: true,
            writable: true
        };
        const myvalue = getattribute(ele, String(key));
        if (typeof myvalue !== "undefined") {
            return {
                value: myvalue,
                ...otherdescipter
            };
        } else {
            return;
        }
    }
    setPrototypeOf() {
        return false;
    }
}

_ele = new WeakMap;

function createeleattragentreadwrite(ele) {
    asserthtmlelement(ele);
    const cached = elementtoproxy.get(ele);
    if (cached) {
        return cached;
    }
    var temp = Object.create(null);
    const handler = new Attrhandler(ele);
    const outputattrs = new Proxy(temp, handler);
    elementtoproxy.set(ele, outputattrs);
    return outputattrs;
}

const elementtoproxy = new WeakMap;

export default createeleattragentreadwrite;
//# sourceMappingURL=index.js.map
