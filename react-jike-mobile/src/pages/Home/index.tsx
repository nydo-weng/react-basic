import { useEffect, useState } from "react";
import "./style.css";
import { Tabs } from "antd-mobile";

import { fetchChannelAPI, type ChannelItem } from "@/apis/list";

const Home = () => {
  const [channels, setChannels] = useState<ChannelItem[]>([]);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const res = fetchChannelAPI();
        setChannels((await res).data.data.channels);
      } catch (error) {
        throw new Error("fetch channel error");
      }
    };
    getChannels();
  }, []);

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
