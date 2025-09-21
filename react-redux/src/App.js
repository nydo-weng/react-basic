import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addToNum } from "./store/modules/counterStore";
import { fetchChannelList } from "./store/modules/channelStore";
import { useEffect } from "react";

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
  const { channelList } = useSelector((state) => state.channel);

  const dispatch = useDispatch();

  // 使用 useEffect 触发异步请求执行, 获取 channelList 数据
  useEffect(() => {
    dispatch(fetchChannelList());
  }, [dispatch]);

  return (
    <div className="App" style={{ paddingTop: "100px" }}>
      <ul>
        {channelList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

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
