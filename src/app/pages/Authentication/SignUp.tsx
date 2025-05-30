import { Button, Input } from "antd";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-pink-500 mb-4">Create your account</h1>
          <div className="flex justify-center space-x-4 mb-6">
            <a href="/signup" className="text-teal-500 font-semibold border-b-2 border-teal-500 pb-1">
              Sign up
            </a>
            <a href="/login" className="text-gray-400 font-semibold border-b-2 border-gray-200 pb-1">
              Log in
            </a>
          </div>
        </div>
        <form className="space-y-4">
          <Input
            placeholder="Username"
            className="w-full h-10 border border-pink-200 bg-pink-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <Input.Password
            placeholder="Password"
            className="w-full h-10 border border-pink-200 bg-pink-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <Input.Password
            placeholder="Confirm password"
            className="w-full h-10 border border-pink-200 bg-pink-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <Input
            type="email"
            placeholder="Email"
            className="w-full h-10 border border-pink-200 bg-pink-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-10 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg flex items-center justify-center"
          >
            Sign up
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-pink-500">
          Already have a account? <a href="/login" className="underline">Log in</a>
        </p>
      </div>
    </div>
  );
}