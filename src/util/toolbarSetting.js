/*
 * @Description: toolbar config helper
 * @Author: xia
 * @Date: 2017-12-05 10:41:40
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-11 10:48:29
 */

/**
 * @description 关闭当前控制弹出框
 * @param {any} toolbar 工具栏组件
 * @param {any} currentRoute 当前路由
 * @param {any} lastRoute 上一次路由
 */
export function closeRouterView (map, toolbar, currentRoute, lastRoute) {
  if (currentRoute === lastRoute) {
    toolbar.$router.push({
      path: '/'
    })
    return true
  }
  return false
}

/* bind id for {object} */
export function bindId (object) {
  let count = 1
  for (const iterator in object) {
    object[iterator].id = count++
  }
  return object
}

/* transform {arr} to router */
export function transformToRoute (arr) {
  const obj = []
  for (const iterator in arr) {
    const item = {
      name: arr[iterator].title,
      path: arr[iterator].route,
      meta: {keepAlive: true}
    }
    if (arr[iterator].component) {
      item.component = arr[iterator].component
    }
    obj.push(item)
  }
  return obj
}

/* action binder for each {action} */
export function bindAction (object) {
  for (const iterator in object) {
    if (object[iterator].action) {
      const action = object[iterator].action
      object[iterator].action = actionHandler(action)
    }
  }
  return object
}

/* action handler for each {action} */
export function actionHandler (action) {
  return (map, toolbar, currentRoute, lastRoute) => {
    const result = action(map, toolbar, currentRoute, lastRoute)
    console.log(result)
  }
}
