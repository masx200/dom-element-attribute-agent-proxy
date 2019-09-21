import createeleattr from "../dist/index.js";
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
console.log(element1);
///////////////////////////////////////////
var textareaelement = document.createElement("textarea");
var textareaattribute = createeleattr(textareaelement);

console.log(textareaattribute.value);

textareaattribute.value = "wwwwwwwwwww";

console.log(textareaattribute.value);
console.log(Reflect.ownKeys(textareaattribute));

document.body.appendChild(textareaelement);

textareaattribute.style = "display:block;width:500px;height:100px";
console.log(textareaelement);
console.log(Object.entries(textareaattribute));
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
inputattribute.style = { display: "block", width: "500px" };

inputattribute.qqqqqqqqqqqqqqqqqqqqq = {
  1: "wwwwwwwwwwww",
  bbbbbbb: "wwwxxxxxxxxx"
};
console.log(inputelement);
console.log(Object.entries(inputattribute));
inputattribute.test1111111111 = true;
inputattribute.test22222222222 = false;
console.log(inputattribute);

textareaattribute.class = new Set(["aaaaaaa", "rrrrrrrrrrrr"]);

inputattribute.class = ["bbbbbbb", "aaaaaaa", "rrrrrrrrrrrr"];
console.log(textareaattribute, inputattribute);
