import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addToNum } from "./store/modules/counterStore";

function B() {
  const { count } = useSelector((state) => state.counter);
  return <span>this is B component using redux get count: {count}</span>;
}

function A() {
  return (
    <div>
      this is A component having B component as child <B />
    </div>
  );
}

function App() {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="App" style={{ paddingTop: "100px" }}>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(addToNum(10))}>add to 10</button>
      <button onClick={() => dispatch(addToNum(20))}>add to 20</button>
      {/* 这里的参数会到 actionCreater 函数中, 作为 action 对象的 payload 属性 */}
      <A />
    </div>
  );
}

export default App;
