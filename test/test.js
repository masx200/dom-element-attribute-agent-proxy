import createeleattr from "../dist/index.js/index.js.js";
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
///////////////////////////////////////////
var textareaelement = document.createElement("textarea");
var textareaattribute = createeleattr(textareaelement);

console.log(textareaattribute.value);

textareaattribute.value = "wwwwwwwwwww";

console.log(textareaattribute.value);
console.log(Reflect.ownKeys(textareaattribute));
console.log(Object.entries(textareaattribute));
document.body.appendChild(textareaelement);
/////////////////////////////////////////////////
var inputelement = document.createElement("input");
inputelement.type = "text";
var inputattribute = createeleattr(inputelement);

console.log(inputattribute.value);

inputattribute.value = "aaaaaaaaaaaaaaaaaaa";

console.log(inputattribute.value);
console.log(Reflect.ownKeys(inputattribute));
console.log(Object.entries(inputattribute));
document.body.appendChild(inputelement);
