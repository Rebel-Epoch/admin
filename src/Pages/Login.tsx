import { Form, Input, Button, Card, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useAuth from "../Utils/useAuth";
import request from "../services/api/request";
import URLS from "../constants/Urls";

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const { login } = useAuth();

  const onFinish = async (values: { email: string; password: string }) => {
    console.log("Login details:", values);
    const { status, HttpStatusCode, data } = await request<any>({
      method: "POST",
      url: URLS.noauth.login,
      data: {
        email: values.email,
        password: values.password,
      },
      showError: false,
    });

    if (status == HttpStatusCode.NOT_FOUND) {
      messageApi.open({
        type: "error",
        content: "Invalid email or password",
      });
    }

    if (status == HttpStatusCode.OK && data) {
      login(data.token);
      messageApi.open({
        type: "success",
        content: "Login successful",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Login failed",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <Card className="w-96 shadow-lg p-4 bg-gray-800">
          <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                className="bg-gray-700 text-white"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                className="bg-gray-700 text-white"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
