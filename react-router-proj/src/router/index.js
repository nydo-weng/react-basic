import Login from "../page/Login";
import Article from "../page/Article";
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "../page/Layout";
import About from "../page/About";
import Board from "../page/Board";
import NotFound from "../page/NotFound";

const router = createBrowserRouter([
  // 这个是 hash 路由模式
  // const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // 设置为默认二级路由, 一级路由访问的时候, 它也能得到渲染
      {
        index: true,
        element: <Board />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/article/:id/:name",
    element: <Article />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
