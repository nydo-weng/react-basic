import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
  name: "counter",

  // 初始化状态 state
  initialState: {
    count: 0,
  },

  // 编写 修改数据 state 的方法, 都是同步方法, 支持直接修改 state
  reducers: {
    // 写的是 ationCreater 函数
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    addToNum(state, action) {
      state.count = action.payload;
    },
  },
});

// 解构出来 actionCreater 函数
const { increment, decrement, addToNum } = counterStore.actions;
// 获取 reducer
const reducer = counterStore.reducer;

// 按需导出的方式, 导出 actionCreater
export { increment, decrement, addToNum };
// 默认导出的方式, 导出 reducer
export default reducer;
