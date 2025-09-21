import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* 这是使用 Link 组件进行跳转, 声明式的导航 */}
      我是登录页<Link to="/article">跳转文章页</Link>
      <button onClick={() => navigate("/article")}>跳转文章页</button>
      <button onClick={() => navigate("/article/1001/jack")}>
        跳转文章页 params 传参
      </button>
      <button onClick={() => navigate("/article?id=1001&name=jack")}>
        跳转文章页 searchParams 传参
      </button>
    </div>
    //
  );
};

export default Login;
