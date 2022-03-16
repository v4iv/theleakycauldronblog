export const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export const uniq = (array) => {
  return array.filter((item, index) => array.indexOf(item) === index)
}

/**
 * @param {string} str
 * @returns {string}
 */
export const kebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * @param obj
 * @param path
 * @param defaultValue
 * @returns {*}
 */
export const get = (obj, path, defaultValue) => {
  const paths = path.split(',')
  let result = obj
  for (let i = 0; i < paths.length; i++) {
    if (result[paths[i]] === undefined) {
      return defaultValue
    }
    result = result[paths[i]]
  }
  return result
}

/**
 * @param obj
 * @param source
 * @returns {boolean}
 */
export const isMatch = (obj, source) => {
  const keys = Object.keys(source)
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]] !== source[keys[i]]) {
      return false
    }
  }
  return true
}
