const acceptValue = ["input", "textarea", "option", "select"];

export default (tag: string, attr: string, attrtype: string) => {
    return (
        (attr === "value" &&
            acceptValue.includes(tag) &&
            attrtype !== "button") ||
        (attr === "selected" && tag === "option") ||
        (attr === "checked" && tag === "input") ||
        (attr === "muted" && tag === "video")
    );
};
