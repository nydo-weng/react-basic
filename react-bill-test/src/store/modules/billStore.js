// 账单列表 相关 store
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "bill",
  // 数据状态
  initialState: {
    billList: [],
  },
  reducers: {
    // 同步修改方法
    setBillList(state, action) {
      state.billList = action.payload;
    },
  },
});

// 结构出来 actionCreater 函数
const { setBillList } = billStore.actions;

// 编写异步
const getBillList = () => {
  return async (dispatch) => {
    // 编写异步请求
    const res = await axios.get("http://localhost:8888/ka");
    // 触发同步 reducer, 修改 state
    dispatch(setBillList(res.data));
  };
};
export { getBillList };
// 导出 reducer
const reducer = billStore.reducer;
export default reducer;
