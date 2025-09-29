import { Layout, Menu, Popconfirm } from "antd";
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import "./index.scss";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "@/store/modules/user";

import { useEffect } from "react";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const onMenuClick = (route) => {
    const path = route.key;
    navigate(path);
  };

  // 反向高亮: 通过 url 访问时, 高亮对应的菜单
  // 1. 获取当前路由路径
  const location = useLocation();
  const selectedkey = location.pathname;
  // console.log(location.pathname);

  // 触发个人信息获取 action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const name = useSelector((state) => state.user.userInfo.name);
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出? " okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            // 反向高亮
            selectedKeys={selectedkey}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
            onClick={onMenuClick}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
