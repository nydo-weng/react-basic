// 项目的根组件
// App -> index.js -> public/index.html(root)

const count = 100;

function getName() {
  return "jack";
}

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
    </div>
  );
}

export default App;
