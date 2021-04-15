export default (text = 'Hello world') => {
  const element = document.createElement('h1')
  element.innerHTML = text
  return element
}
