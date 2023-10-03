import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../store/action/actionCreator";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log(loginForm);
  };

  let onFinish = async () => {
    try {
      await dispatch(login(loginForm));
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="w-[400px] rounded-lg text-center bg-gray-100 modal-custom translate-y-2/4 p-10">
      <h1 className="text-3xl font-bold mb-10   ">Login</h1>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        initialValues={loginForm}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-500">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginView;
