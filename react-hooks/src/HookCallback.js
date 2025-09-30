import { memo, useState, useCallback } from "react";

const Input = memo(function Input({ onChange }) {
  console.log("子组件重新渲染了");
  return <input type="text" onChange={(e) => onChange(e.target.value)} />;
});

function HookCallback() {
  // 传给子组件的函数
  // const changeHandler = (value) => console.log(value);
  // 空数组代表 依赖为空, 也就是这个函数永远不用更新
  const changeHandler = useCallback((value) => console.log(value), []);

  // 触发父组件重新渲染的函数
  const [count, setCount] = useState(0);
  return (
    <div>
      {/* 把函数作为 prop 传给子组件 */}
      <Input onChange={changeHandler} />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}

export default HookCallback;
