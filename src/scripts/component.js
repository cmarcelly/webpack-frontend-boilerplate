export default (text = 'John') => {
  const element = document.createElement('h2')
  element.innerHTML = 'Hello ' + text
  return element
}
