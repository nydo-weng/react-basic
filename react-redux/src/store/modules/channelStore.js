import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const channelStore = createSlice({
  // store 名字
  name: "channel",
  // 初始化状态 state
  initialState: {
    channelList: [],
  },

  reducers: {
    setChannels(state, action) {
      state.channelList = action.payload;
    },
  },
});

// 异步请求部分
const { setChannels } = channelStore.actions;

const fetchChannelList = () => {
  return async (dispatch) => {
    // 获取异步数据
    const res = await axios.get("http://geek.itheima.net/v1_0/channels");
    // 调用 dispatch, 通过 action 传参的方式, 把异步数据放到 action 的 payload 中, 然后修改 state
    dispatch(setChannels(res.data.data.channels));
  };
};

// 依旧是一个 actionCreator
export { fetchChannelList };

const reducer = channelStore.reducer;
export default reducer;
