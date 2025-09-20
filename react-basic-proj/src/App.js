import { useState } from "react";

// 项目的根组件
// App -> index.js -> public/index.html(root)

const count = 100;

function getName() {
  return "jack";
}

/* function Button() {
  // 业务逻辑
  return <button>click me button 组件</button>;
} */
// 上面这个可以写成箭头函数
const Button = () => {
  return <button>click me button 组件</button>;
};

function App() {
  /* JSX 简介
  这是一个典型的 JSX, JSX 是 JavaScript 和 XML(HTML) 的缩写, 表示在 JS 代码中编写 HTML 模版结构, 是 React 中编写 UI 模版的方式.
  优势:
  1. HTML 的声明式模版写法
  2. JS 的可编程能力 


  JSX 并不是标准的 JS 语法, 它是 JS 的语法拓展, 浏览器本身不能识别, 需要通过解析工具做解析之后才能在浏览器中运行.
  JSX -> BABEL -> JS
  */

  /* JSX 高频场景
  在 JSX 中可以通过 大括号语法 {} 识别 JavaScript 中的表达式, 比如常见的变量, 函数调用, 方法调用等等.
  1. 使用引号传递字符串
  2. 使用 JavaScript 变量
  3. 函数调用和方法调用
  4. 使用 JavaScript 对象
  注意, 只能使用表达式, 不能使用语句, if, switch, 变量声明都属于语句, 不是表达式 不等出现在 {} 中.
  */

  /* 在 JSX 中实现列表渲染 
  语法: 在 JSX 中可以使用原生 JS 中的 map 方法 遍历渲染列表
  */

  const list = [
    { id: 1001, name: "vue" },
    { id: 1002, name: "react" },
    { id: 1003, name: "angular" },
  ];

  /* 在 JSX 中实现 条件渲染 
  语法中:
  1. 通过 逻辑与 运算符
  {flag && <span>this is span</span>}
  2. 三元表达式 (?:)
  {loading ? <span>loading...</span> : <span>this is span</span>}
  
  复杂情况条件渲染
  解决方案: 自定义函数 + if 判断语句
  */

  // 定义文章类型
  const articleType = 3; // 0 1 3 代表无图, 单图, 三图

  // 定义核心函数 根据文章类型返回不同的 JSX 模版
  function getArticleTemp() {
    if (articleType === 0) {
      return <div>无图</div>;
    } else if (articleType === 1) {
      return <div>单图</div>;
    } else if (articleType === 3) {
      return <div>三图</div>;
    }
  }

  const handleClick = (name, e) => {
    console.log("button clicked", name, e);
  };

  /* 组件是什么?
  这是通用概念, 不挑框架
  概念: 一个组件就是用户界面的一部分, 它可以有自己的逻辑和外观, 组件之间可以相互嵌套, 也可以复用多次
  组件化开发可以让开发者像搭积木一样构建一个完整的庞大的应用

  React 组件, 就是首字母大写的函数, 内部存放了组件的逻辑和视图 UI, 渲染组件只需要把组件当成标签书写即可
  可以用自闭和或者闭合标签来书写组件
  */

  /* UseState基础使用
  useState 是一个 Reack Hook 函数, 它允许我们想组件添加一个 *状态变量*, 从而控制影响组件的渲染结果
  本质: 和普通 JS 变量不同的是, 状态变量一旦发生变化, 组件的视图 UI 也会跟着发生变化 *数据驱动视图*
  */

  const [count, setCount] = useState(0);

  /* 状态不可变 
  在 React 中, 状态被认为是只读的, 我们应该始终替换它而不是修改它, 直接修改状态不能引发视图的更新
  always 调用 setXXX 来修改状态, 这在内部会用新的替代旧的,
  不能直接修改状态变量, XXX++, 这个确实能修改变量, 可以打印在控制台, 但是这种直接修改无法引发视图更新, 必须调用 setXXX 来修改状态.
  */

  /* 修改对象状态 
  规则: 对于对象类型的状态变量, 应该始终传递给 setXXX 方法一个 *全新的对象* 来进行修改
  */

  /* 这样修改是不可以的, 因为直接修改源对象, 所以不会引发视图的变化 */
  /* const [form, setFrom] = useState({name: "jack"});
  const handleChange = () => {form.name = "john"}; */

  /* 这样修改是可以的, 因为传递给 setXXX 方法一个 *全新的对象* 来进行修改, 通过展开运算符 ... 来实现, 展开对象的所有字段, 需要修改就直接写, 如果有一样的字段, 新的值就会覆盖旧的值 */
  /* const handleChange = () => {
    setFrom({...form, name: "john"});
  } */

  return (
    <div className="App">
      this is App
      {/* 1. 使用引号传递字符串 */}
      {"this is message"}
      {/* 2. 使用 JavaScript 变量 */}
      {count}
      {/* 3. 函数调用 */}
      {getName()}
      {/* 3. 方法调用 */}
      {new Date().getDate()}
      {/* 4. 使用 JavaScript 对象 */}
      <div style={{ color: "red" }}>this is div</div>
      {/* JSX 中使用原生 JS 中的 map 方法遍历渲染列表 
      在 React 遍历渲染 List 时, 每个 key 属性都是必须的, 绑定一个独一无二的 id, 这样在列表渲染时, 可以快速定位到列表中的元素.
      主要是给 React 内部使用的一个标识, 提升渲染性能.
      */}
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {getArticleTemp()}
      <button onClick={(e) => handleClick("myname", e)}>click me</button>
      {/* 渲染自定义组件 */}
      <Button />
      <Button></Button>
      {/* 回调函数的作用, 1. 用传入的新值修改 count, 2. 重新使用新的 count 渲染 UI */}
      <button onClick={() => setCount(count + 1)}>我是计数器: {count}</button>
    </div>
  );
}

export default App;
