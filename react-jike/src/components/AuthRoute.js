// 封装高阶组件
// 核心逻辑: 有 token 正常跳转, 无 token 去登录
import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

// children 是原本要跳转到的路由组件,
// 如果有 token, 就允许用户跳转到想去的路由组件
// 如果没有 token, 重定向用户到登录组件
export function AuthRoute({ children }) {
  const token = getToken();

  if (token) {
    return <>{children}</>;
  } else {
    // replace 意思是不要之前的记录
    return <Navigate to={"/login"} replace />;
  }
}
