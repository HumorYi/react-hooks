import React, { useState, useEffect } from 'react'

/**
 * 有时候想要在组件之间重用⼀些状态逻辑。目前为止，有两种主流方案来解决这个问题：高阶组件和 render props。
 * 自定义 Hook 可以让在不增加组件的情况下达到同样的目的
 *
 * 自定义 Hook 是⼀个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook
 *
 * Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：
 * 只能在函数最外层调⽤用 Hook。不要在循环、条件判断或者子函数中调⽤用。
 *
只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有⼀个地⽅可以调用 Hook —— 就是自定义的 Hook 中。）
 */

export default function CustomHook(props) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('render')
    document.title = `You clicked ${count} title`
  }, [count])

  return (
    <div>
      <h3>CustomHook</h3>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>click</button>
      <p>{useClock().toLocaleTimeString()}</p>
    </div>
  )
}

function useClock() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return date
}
