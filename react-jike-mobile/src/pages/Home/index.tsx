import "./style.css";
import { Tabs } from "antd-mobile";

import { useTabs } from "./useTabs";

const Home = () => {
  const { channels } = useTabs();
  return (
    <div>
      <div className="tabContainer">
        <Tabs>
          {channels.map((item) => {
            return (
              <Tabs.Tab key={item.id} title={item.name}>
                {item.name}
              </Tabs.Tab>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
