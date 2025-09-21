import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./store/modules/counterStore";

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
      <A />
    </div>
  );
}

export default App;
