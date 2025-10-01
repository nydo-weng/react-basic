import "./style.css";
import { Tabs } from "antd-mobile";

import { useTabs } from "./useTabs";
import HomeList from "./HomeList";

const Home = () => {
  const { channels } = useTabs();
  return (
    <div>
      <div className="tabContainer">
        <Tabs defaultActiveKey={"0"}>
          {channels.map((item) => {
            return (
              <Tabs.Tab key={item.id} title={item.name}>
                {/* list 组件 */}
                {/* 记得加上类名, 严格控制滚动盒子 */}
                <div className="listContainer">
                  <HomeList channelId={item.id.toString()} />
                </div>
              </Tabs.Tab>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
