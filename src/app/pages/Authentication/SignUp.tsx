import { Button, Input, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";

interface SignUpFormValues {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export default function SignUp() {
  const navigate = useNavigate();

  const onFinish = (values: SignUpFormValues) => {
    console.log("Success:", values);
    // TODO: Logic gửi dữ liệu đăng ký
    navigate("/login");
  };

  const validateConfirmPassword = (
    { getFieldValue }: { getFieldValue: (name: string) => StoreValue }
  ) => ({
    validator(_: RuleObject, value: StoreValue) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords do not match!"));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-pink-500 mb-4">Create your account</h1>
          <div className="flex justify-center space-x-4 mb-6">
            <span className="text-teal-500 font-semibold border-b-2 border-teal-500 pb-1">
              Sign up
            </span>
            <Link to="/login" className="text-gray-400 font-semibold border-b-2 border-transparent hover:border-gray-300 pb-1">
              Log in
            </Link>
          </div>
        </div>

        <Form<SignUpFormValues> layout="vertical" onFinish={onFinish} className="space-y-4">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              placeholder="Username"
              className="h-10 border border-pink-200 bg-pink-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              className="h-10 border border-pink-200 bg-pink-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              validateConfirmPassword,
            ]}
          >
            <Input.Password
              placeholder="Confirm password"
              className="h-10 border border-pink-200 bg-pink-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input
              placeholder="Email"
              className="h-10 border border-pink-200 bg-pink-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>

        <p className="mt-4 text-center text-sm text-pink-500">
          Already have an account? <Link to="/login" className="underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
