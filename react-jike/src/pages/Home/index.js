import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const Home = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    // 保证 dom 可用, 才进行图表渲染
    // 1. 获取渲染图标的 dom 节点
    // const chartDom = document.getElementById("main"); // 这个是 Js 原生操作获取 dom 元素
    const chartDom = chartRef.current; // 用 react 的 useRef hook 获取 dom 元素
    // 2. 图表初始化, 生成图表实例对象
    const myChart = echarts.init(chartDom);
    // 3. 准备图表参数
    const option = {
      xAxis: {
        type: "category",
        data: ["vue", "React", "Angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 40, 70],
          type: "bar",
        },
      ],
    };
    // 4. 使用图表参数, 完成图表的渲染
    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <div id="main" ref={chartRef} style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default Home;
