import { createRoot } from "react-dom/client";
// 导入 router 实例
import router from "./router/index.tsx";
// 导入 provider
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
