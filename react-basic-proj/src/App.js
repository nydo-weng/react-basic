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
    </div>
  );
}

export default App;
