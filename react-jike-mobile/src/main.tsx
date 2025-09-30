import { createRoot } from "react-dom/client";
// 导入 router 实例
import router from "./router/index.tsx";
// 导入 provider
import { RouterProvider } from "react-router-dom";

// // 测试接口
// import { fetchChannelAPI } from "@/apis/list.ts";

// fetchChannelAPI().then((res) => {
//   console.log(res.data.data.channels);
// });

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
