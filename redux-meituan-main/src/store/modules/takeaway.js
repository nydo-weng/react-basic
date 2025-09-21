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
    // 购物车列表
    cartList: [],
  },
  reducers: {
    setFoodsList(state, action) {
      state.foodsList = action.payload;
    },
    // 更改 activeIndex
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
    // 添加购物车
    addCart(state, action) {
      const item = state.cartList.find((item) => item.id === action.payload.id);
      if (item) {
        // 添加过
        item.count++;
      } else {
        // 没添加过，设置初始 count 为 1
        state.cartList.push({
          ...action.payload,
          count: 1,
        });
      }
    },
    // count +
    increCount(state, action) {
      // 关键点: 找到当前要修改谁的 count, id
      const item = state.cartList.find((item) => item.id === action.payload.id);
      item.count++;
    },
    // count -
    decreCount(state, action) {
      const item = state.cartList.find((item) => item.id === action.payload.id);
      // 这也是一种业务逻辑, 如果等于 0, 就不做任何操作, 这样还会再购物车里显示, 只是 count 为 0
      if (item.count === 0) return;
      item.count--;
      // // 如果等于 0, 移出 cart, 这是一种业务逻辑, 这样到 0 就会从购物车里消失
      // if (item.count === 0) {
      //   state.cartList = state.cartList.filter(
      //     (item) => item.id !== action.payload.id
      //   );
      // }
    },
    // 清空购物车
    clearCart(state) {
      state.cartList = [];
    },
  },
});

// 解构出来 actionCreater 函数
const {
  setFoodsList,
  changeActiveIndex,
  addCart,
  increCount,
  decreCount,
  clearCart,
} = foodsStore.actions;

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
export {
  fetchFoodsList,
  changeActiveIndex,
  addCart,
  increCount,
  decreCount,
  clearCart,
};

// 导出 reducer
const reducer = foodsStore.reducer;
export default reducer;
