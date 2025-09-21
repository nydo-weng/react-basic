// 编写 store
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
  name: "foods",
  initialState: {
    // 商品列表
    foodsList: [],
    // 菜单激活下标值
    activeIndex: 0,
  },
  reducers: {
    setFoodsList(state, action) {
      state.foodsList = action.payload;
    },
    // 更改 activeIndex
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
  },
});

// 解构出来 actionCreater 函数
const { setFoodsList, changeActiveIndex } = foodsStore.actions;

// 异步获取部分
const fetchFoodsList = () => {
  return async (dispatch) => {
    // 编写异步逻辑
    const res = await axios.get("http://localhost:3004/takeaway");
    // 利用 dispatch 函数提交 action
    dispatch(setFoodsList(res.data));
  };
};

// 按需导出
export { fetchFoodsList, changeActiveIndex };

// 导出 reducer
const reducer = foodsStore.reducer;
export default reducer;
