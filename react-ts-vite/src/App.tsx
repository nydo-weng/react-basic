import { useState } from "react";

// useState 根据初始值做自动推断
// 场景: 明确的初始值

type User = {
  name: string;
  age: number;
};

function App() {
  const [value, toggle] = useState(false);

  const [list, setList] = useState([1, 2, 3]);

  const changeValue = () => {
    toggle(true);
  };

  const changeList = () => {
    setList([4, 5, 6]);
  };

  // 1. 限制初始值类型
  // const [user, setUser] = useState<User>({
  //   name: "jack",
  //   age: 18,
  // });

  // const [user, setUser] = useState<User>(() => {
  //   return {
  //     name: "jack",
  //     age: 18,
  //   };
  // });

  const [user, setUser] = useState<User>({
    name: "jack",
    age: 19,
  });

  // const changeUser = () => {
  //   setUser(() => ({
  //     name: "john",
  //     age: 28,
  //   }));
  // };

  // 当初始值置空的时候, setUser 可以接受 undefined, 但是使用情况很少
  // const changeUser = () => {
  //   setUser(undefined);
  // };

  const changeUser = () => {
    setUser({
      name: "john",
      age: 28,
    });
  };

  return (
    <>
      this is app. {value}, {list}, {user.name}
    </>
  );
}

export default App;
