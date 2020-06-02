import React, { useState, useEffect, useMemo, useCallback, PureComponent } from 'react'

export default function Hook(props) {
  const [count, setCount] = useState(0)
  const [date, setDate] = useState(new Date())
  const [value, setValue] = useState('')

  /**
   * 注意:
   * 依赖项数组不会作为参数传给“创建”函数。
   * 虽然从概念上来说它表现为：所有“创建”函数中引用的值都应该出现在依赖项数组中。
   * 未来编译器会更加智能，届时⾃动创建数组将成为可能
  */

  /**
    * 把“创建”函数和依赖项数组作为参数传入 useMemo ，
    * 它仅会在某个依赖项改变时才重新计算memoized 值。
    * 这种优化有助于避免在每次渲染时都进行高开销的计算
  */
  const expensive = useMemo(() => {
    console.log('computed')
    let sum = 0

    for (let i = 0; i < count; i++) {
      sum += i
    }

    return sum
  }, [count])

  /**
    * 把内联回调函数及依赖项数组作为参数传入 useCallback ，
    * 它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。
    * 当你把回调函数传递给经过优化的并使用引用相等性去避免⾮必要渲染（例例如 shouldComponentUpdate ）的子组件时，它将非常有用
  */
  const addClick = useCallback(() => {
    let sum = 0;

    for (let i = 0; i < count; i++) {
    sum += i
    }

    return sum
  }, [count])

  // 与 componentDidMount 和 componentDidUpdate相似
  /**
   * Effect Hook 可以让你在函数组件中执行副作用操作，
   * 数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用。
   *
   * 在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器器、
   * 记录日志以及执行其他包含副作用的操作都是不被允许的，
   * 因为这可能会产生莫名其妙的 bug 并破坏 UI 的⼀致性；
   *
   * 使用 useEffect 完成副作用操作。赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。
   * 可以把 effect 看作从 React 的纯函数式世界通往命令式世界的逃生通道；
   *
   * 默认情况下，effect 将在每轮渲染结束后执行，可以选择让它 在只有某些值改变的时候 才执行；
   *
   * 条件执行：
   *
   * 默认情况下，effect 会在每轮组件渲染完成后执行。这样的话，⼀旦 effect 的依赖发生变化，
   * 它就会被重新创建。然而，在某些场景下这么做可能会矫枉过正。
   * 比如，在订阅示例中，不需要在每次组件更新时都创建新的订阅，而是仅需要在 source props 改变时重新创建。
   * 要实现这⼀点，可以给 useEffect 传递第二个参数，它是 effect 所依赖的值数组；
   *
   * 只有当 useEffect第二个参数数组里的数值 改变后才会重新创建订阅
   */
  useEffect(() => {
    console.log('render')
    document.title = `You clicked ${count} title`
  }, [count])

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    // 组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源。
    // 要实现这⼀点， useEffect函数需返回一个清除函数，以防止内存泄漏漏，清除函数会在组件卸载前执行

    // 类似willUnmount
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <h3>Hook</h3>
      <p>expensive: {expensive}</p>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>click</button>
      <p>{date.toLocaleTimeString()}</p>
      <input type="text" value={value} onChange={event => setValue(event.target.value)} />
      <Child addClick={addClick} />
    </div>
  )
}

class Child extends PureComponent {
  render() {
    console.log("child render");
    const { addClick } = this.props;

    return (
    <div>
      <h3>Child</h3>
      <button onClick={() => console.log(addClick())}>add</button>
    </div>
    )
  }
}
