const acceptValue = ['input', 'textarea', 'option', 'select']

export default (tag, attr) => {
const type=tag
  return (
    (attr === 'value' && acceptValue.includes(tag) && type !== 'button') ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
}
