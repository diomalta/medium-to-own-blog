export function capitalize(str) {
  const head = str[0]
  const tail = str.slice(1)
  return `${head.toUpperCase()}${tail}`
}
