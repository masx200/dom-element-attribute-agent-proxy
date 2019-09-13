import createeleattr from "../createeleattragentreadwrite.js";
var element1 = document.querySelector("div");
var attribute1 = createeleattr(element1);

console.log(attribute1.class);
attribute1["data-tagsearch-ref"] = "master";

attribute1.class = "sssssssq";
console.log(attribute1.class);

attribute1.testarray = [1, "sssssssq"];
console.log(attribute1.testarray);
console.log(Reflect.ownKeys(attribute1));
console.log(Object.entries(attribute1));
