import { useState } from "react";

// useState 根据初始值做自动推断
// 场景: 明确的初始值

type User = {
  name: string;
  age: number;
};

// type Props = {
//   className: string;
// };

interface Props {
  className: string; // 必填属性
  title?: string; // 可选属性
}

function Button(props: Props) {
  const { className } = props;
  return <button>click me</button>;
}

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

  // 1. 限制 useState 函数参数的初始值可以是 User | null
  // 2. 限制 setUser 函数的参数类型可以是 User| null
  const [nuser, setNUser] = useState<User | null>({
    name: "nnn",
    age: 26,
  });

  const changeNUser = () => {
    // setNUser({
    //   name: "jack",
    //   age: 18,
    // });
    setNUser(null);
  };

  return (
    <>
      {/* 为了类型安全, 针对 既可以是 user 又可以是 null 的联合类型, 通过可选链, 做类型守卫*/}
      {/* 只有当 nuser 不为 null 不为空值时, 才进行点运算 */}
      <button onClick={changeNUser}>清空 nnn</button>
      this is app. {value}, {list}, {user.name}, {nuser?.name}
      <Button className="test" />
    </>
  );
}

export default App;
