/* const camelizeRE = /-(\w)/g;
const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
};
 */
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = (str: string): string => {
    return str.replace(hyphenateRE, "-$1").toLowerCase();
};
