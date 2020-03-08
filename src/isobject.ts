export function isobject(a: any): a is Record<any, any> {
    return typeof a === "object" && a !== null;
}
