// zustand
import { create } from "zustand";

// 1. 创建 store

const useStore = create((set) => {
  return {
    // 状态数据
    count: 0,
    // 修改状态数据的方法
    inc: () => {
      set((state) => ({
        count: state.count + 1,
      }));
    },
  };
});

// 2. 绑定

function App() {
  const { count, inc } = useStore();
  return (
    <div className="App">
      <button onClick={inc}>+</button>
      {count}
    </div>
  );
}

export default App;
