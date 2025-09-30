// useMemo
// 缓存: 消耗非常大的计算, 计算非常密集, 才会使用这个 hook, 使用场景比较少

import { useState, useMemo } from "react";

// 计算斐波那契数列之和
function fib(n) {
  console.log("计算函数执行了");
  if (n < 3) {
    return 1;
  }
  return fib(n - 2) + fib(n - 1);
}

function HookMemo() {
  const [count1, setCount1] = useState(0);

  const result = useMemo(() => {
    // 返回计算得到的结果
    return fib(count1);
  }, [count1]);

  const [count2, setCount2] = useState(0);
  console.log("组件重新渲染了");
  return (
    <div>
      this is HookMemo
      <button onClick={() => setCount1(count1 + 1)}>change count1: {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>change count2: {count2}</button>
      {result}
    </div>
  );
}

export default HookMemo;
