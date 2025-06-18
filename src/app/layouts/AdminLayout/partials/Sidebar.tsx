import { Menu } from "antd";
import {
  HomeOutlined,
  MessageOutlined,
  ShoppingOutlined
} from "@ant-design/icons";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Logo from "@/app/components/Logo";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeItemStyle = "!bg-sky-600 !text-white hover:!bg-sky-500";
  const itemStyle = "w-full flex hover:!bg-sky-600 !text-zinc-600 hover:!text-white";

  const [selectedKey, setSelectedKey] = useState("/dashboard");

  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/dashboard")) {
      setSelectedKey("/dashboard");
    } else if (path.includes("/Product")) {
      setSelectedKey("/Product");
    } else if (path.includes("/Feedbackadmin")) {
      setSelectedKey("/Feedbackadmin");
    } else {
      setSelectedKey("/dashboard");
    }
  }, [location.pathname]);

  const navItems = [
    {
      label: "Dashboard",
      key: "/dashboard",
      path: "/dashboard",
      className: selectedKey === "/dashboard" ? activeItemStyle : itemStyle,
      icon: <HomeOutlined />,
    },
    {
      label: "Quản Lý Products",
      key: "/Product",
      path: "/Product",
      className: selectedKey === "/Product" ? activeItemStyle : itemStyle,
      icon: <ShoppingOutlined />,
    },
    {
      label: "Quản Lý Feedback",
      key: "/Feedbackadmin",
      path: "/Feedbackadmin",
      className: selectedKey === "/Feedbackadmin" ? activeItemStyle : itemStyle,
      icon: <MessageOutlined />,
    },
  ];

  return (
    <Layout.Sider
      collapsible
      collapsed={isCollapsed}
      onCollapse={(value) => setIsCollapsed(value)}
      className="!bg-white pt-4"
      width={250}
    >
      <div className="px-6 mb-6 flex justify-between items-center">
        <Logo collapsed={isCollapsed} className="!text-black" />
      </div>
      <Menu
        className="mt-4 px-2 bg-white"
        selectedKeys={[selectedKey]}
        mode="vertical"
        items={navItems}
        onClick={({ key }) => navigate(key)}
      />
    </Layout.Sider>
  );
};

export default Sidebar;