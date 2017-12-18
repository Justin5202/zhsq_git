/**
 * @description get point from data
 */
export function getPoint (data) {
  if (pointLike(data)) {
    return data
  }
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key]
      if (pointLike(element)) {
        return element
      } else {
        return element.length && getPoint(element)
      }
    }
  }
  return []
}

function pointLike (arr) {
  return arr.length && arr.length === 2 && !arr[0].length
}
