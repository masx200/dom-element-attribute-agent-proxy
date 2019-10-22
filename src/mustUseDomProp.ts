const acceptValue = ['input', 'textarea', 'option', 'select']

export default (tag, attr,attrtype) => {
  return (
    (attr === 'value' && acceptValue.includes(tag) && attrtype !== 'button') ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
}
