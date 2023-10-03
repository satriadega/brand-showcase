import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              colorBgHeader: "rgb(0,0,0, 0.7)",
            },
          },
        }}
      >
        <RouterProvider router={router} />
        <ToastContainer />
      </ConfigProvider>
    </>
  );
}

export default App;
