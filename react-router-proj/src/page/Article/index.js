// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Article = () => {
  const navigate = useNavigate();
  return (
    <div>
      我是文章页
      <button onClick={() => navigate("/login")}>跳转登录页</button>
    </div>
    //
  );
};

export default Article;
