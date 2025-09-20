// 项目的根组件
// App -> index.js -> public/index.html(root)
function App() {
  /* 
  这是一个典型的 JSX, JSX 是 JavaScript 和 XML(HTML) 的缩写, 表示在 JS 代码中编写 HTML 模版结构, 是 React 中编写 UI 模版的方式.
  优势:
  1. HTML 的声明式模版写法
  2. JS 的可编程能力 


  JSX 并不是标准的 JS 语法, 它是 JS 的语法拓展, 浏览器本身不能识别, 需要通过解析工具做解析之后才能在浏览器中运行.
  JSX -> BABEL -> JS
  */
  return <div className="App">this is App</div>;
}

export default App;
