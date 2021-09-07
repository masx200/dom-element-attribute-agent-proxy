# dom-element-attribute-agent-proxy

基于 proxy 封装的对于 dom 元素的 attribute 的读写操作库

# 安装方法

```powershell
yarn add https://github.com/masx200/dom-element-attribute-agent-proxy.git
```

或者

```powershell
cnpm install  --save https://github.com/masx200/dom-element-attribute-agent-proxy.git
```

# API

```typescript
declare function createeleattr(ele: HTMLElement): Record<string, any>;
```

# 使用方法

```javascript
import createeleattr from "@masx200/dom-element-attribute-agent-proxy";
var element1 = document.querySelector(
    "div.Popover.anim-scale-in.js-tagsearch-popover"
);
var attribute1 = createeleattr(element1);
attribute1.testarray = [1, "sssssssq"];
console.log(attribute1.testarray);
console.log(Reflect.ownKeys(attribute1));
console.log(attribute1.class);
attribute1["data-tagsearch-ref"] = "master";
console.log(Object.entries(attribute1));
attribute1.class = new Set(["wwwwwwwww1", "sssssssq"]);
 attribute1.style = { display: "block", width: "500px" };
 console.log( attribute1.style)
   attribute1.style = "display:block;width:500px;height:100px";
 console.log( attribute1.style)
```

# 设置`attributes`类型说明

`style`属性支持类型为`string|Record<string,string>`

`class`属性支持类型为`string|Array<string>|Set<string>`

其他属性支持`Set<any>|Array<any>|string|Record<string,string>|Object`

如果设置属性的值为类型`Object`,则将其用`JSON.stringify`转换成`string`类型

# 更新 : 添加了对于 `input`元素中 `type="checkbox"` 的 `checked` 的读写操作,

# 更新 : 添加了对于 `input` 和 `textarea`和`select`元素 的 `value` 的读写操作,

# 支持`style` 属性的对象类型和字符串类型

# 更新：`style`属性支持驼峰命名法和横杠命名法，自动转换成字符串

# 更新 :添加了 `class` 属性对于 `Array` 和 `Set` 的支持,也增加了其他属性对于 `Set` 转 `Array` 的支持

# 关于 `Proxy`

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
