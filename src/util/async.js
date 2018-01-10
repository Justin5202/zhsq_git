/*
 * @Description: process control
 * @Author: xia
 * @Date: 2018-01-10 11:04:53
 * @Last Modified by: xia
 * @Last Modified time: 2018-01-10 16:26:28
 */

/**
 * @description simplify parallel execute
 * @param {Array} task
 * @return {Promise}
 */
export const parallel = (arr) => {
  var tasks = Array.prototype.slice.call(arr)
  return new Promise((resolve) => {
    if (!tasks || tasks.length === 0) return resolve([])
    const count = tasks.length
    const value = []
    let success = 0
    let failure = 0
    for (var index in tasks) {
      tasks[index]().then(result => {
        value[index] = result
        success++
        if (success + failure === count) resolve(value)
      }).catch(error => {
        failure++
        console.error(`Error In Parallel Execution \n${error}`)
        if (success + failure === count) resolve(value)
      })
    }
  })
}
