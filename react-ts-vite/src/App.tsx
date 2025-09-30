import { useState } from "react";

// useState 根据初始值做自动推断
// 场景: 明确的初始值

function App() {
  const [value, toggle] = useState(false);

  const [list, setList] = useState([1, 2, 3]);

  const changeValue = () => {
    toggle(true);
  };

  const changeList = () => {
    setList([4, 5, 6]);
  };
  return (
    <>
      this is app. {value}, {list}
    </>
  );
}

export default App;
