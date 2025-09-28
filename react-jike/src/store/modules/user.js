// 和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";

import { request } from "@/utils";

const userStore = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    token: localStorage.getItem("token_key") || "",
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // 在 localstorage 也存一份
      localStorage.setItem("token_key", action.payload);
    },
  },
});

// 解构出 actionCreater
const { setToken } = userStore.actions;

// 获取 reducer 函数
const userReducer = userStore.reducer;

// 异步方法 完成登录 获取 token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 1. 发送异步请求
    const res = await request.post("/authorizations", loginForm);
    // 2. 提交同步 action 进行 token 的存入
    dispatch(setToken(res.data.token));
  };
};

export { setToken, fetchLogin };

export default userReducer;
