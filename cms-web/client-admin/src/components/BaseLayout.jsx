import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Loading from "./Loading";
const { Content } = Layout;

const BaseLayout = () => {
  const { categoriesLoading } = useSelector((state) => state.category);
  return (
    <>
      <Layout>
        <Sidebar />
        <Layout>
          <Content>
            <div
              style={{
                minHeight: "100vh",
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default BaseLayout;
