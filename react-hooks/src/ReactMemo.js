// React.memo
import { useState, memo } from "react";

const MemoSon = memo(function Son(props) {
  console.log("我是子组件, 我重新渲染了");
  return <div>this is son, sonCount is {props.sonCount}</div>;
});

// function Son() {
//   console.log("我是子组件, 我重新渲染了");
//   return <div>this is son</div>;
// }

function ReactMemo() {
  const [count, setCount] = useState(0);
  const [sonCount, setSonCount] = useState(0);
  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>+ "count"{count}</button>
      <button onClick={() => setSonCount(sonCount + 1)}>+ "sonCount" {sonCount}</button>

      {/* <Son /> */}
      <MemoSon sonCount={sonCount} />
    </div>
  );
}

export default ReactMemo;
