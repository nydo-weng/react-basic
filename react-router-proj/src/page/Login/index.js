import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      {/* 这是使用 Link 组件进行跳转, 声明式的导航 */}
      我是登录页<Link to="/article">跳转文章页</Link>
    </div>
    //
  );
};

export default Login;
