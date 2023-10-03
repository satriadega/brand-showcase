import React from "react";
import {
  HomeFilled,
  TagsFilled,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, theme } from "antd";
const { Sider } = Layout;

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        // console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
      }}
    >
      <img
        src="https://cdn.cnnindonesia.com/cnnid/images/logo.webp?v=10.10.5"
        alt="cnn logo"
        className="w-full h-[160px] mb-10 p-3"
        style={{ borderRadius: "20px" }}
      />
      <div className="text-white font-semibold  text-base flex flex-col gap-2">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-red-300" : "")}
        >
          <div className="hover:text-red-400 ml-4 cursor-pointer flex">
            <HomeFilled />
            <p className="ml-2">Dashboard</p>
          </div>
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) => (isActive ? "text-red-300" : "")}
        >
          <div className="hover:text-red-400 ml-4 cursor-pointer flex">
            <TagsFilled />
            <p className="ml-2">Categories</p>
          </div>
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) => (isActive ? "text-red-300" : "")}
        >
          <div className="hover:text-red-400 ml-4 cursor-pointer flex">
            <UserAddOutlined />
            <p className="ml-2">Register Admin</p>
          </div>
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "text-red-300" : "")}
        >
          <div
            className="hover:text-red-400 ml-4 cursor-pointer flex"
            onClick={() => localStorage.clear()}
          >
            <LogoutOutlined />
            <p className="ml-2">Sign Out</p>
          </div>
        </NavLink>
      </div>
    </Sider>
  );
};

export default Sidebar;
