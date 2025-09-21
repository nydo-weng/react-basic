// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useParams } from "react-router-dom";

const Article = () => {
  const navigate = useNavigate();
  // const [params] = useSearchParams();
  // const id = params.get("id");
  // const name = params.get("name");
  const params = useParams();
  const id = params.id;
  const name = params.name;

  return (
    <div>
      我是文章页{id} {name}
      <button onClick={() => navigate("/login")}>跳转登录页</button>
    </div>
    //
  );
};

export default Article;
