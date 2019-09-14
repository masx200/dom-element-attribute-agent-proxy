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
function createeleattr(ele: HTMLElement): object;
```

# 使用方法

```js
import createeleattr from "dom-element-attribute-agent-proxy";
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
```

# 更新 : 添加了对于 input 和 textarea 的 value 的读写操作

# 关于 Proxy

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
