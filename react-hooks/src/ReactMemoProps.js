// React.memo props 比较机制

// 1. 传递一个简单类型的 prop, prop 变化时组件重新渲染
// 2. 传递一个引用类型的 prop, 比较的是新值和旧值的引用是否相等, 当父组件的函数重新执行时, 实际上形成的是新的数组引用
// 3. 保证引用稳定 -> useMemo 组件渲染的过程中 缓存一个值

import { memo, useMemo, useState } from "react";

const MemoSon = memo(function son({ list }) {
  console.log("子组件重新渲染了");
  return <div>this is son: {list}</div>;
});

function ReactMemoProps() {
  const [count, setCount] = useState(0);

  // const list = [1, 2, 3];
  const list = useMemo(() => {
    return [1, 2, 3];
  }, []);

  return (
    <div className="App">
      <MemoSon list={list} />
      <button onClick={() => setCount(count + 1)}>change Count {count}</button>
    </div>
  );
}

export default ReactMemoProps;
